import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import PatientModel from "@/lib/models/patient.model";
import VisitModel from "@/lib/models/visit.model";
import bcrypt from "bcrypt";
import { UAParser } from "ua-parser-js";

import Pusher from "pusher";
import { detectDeviceType } from "@/lib/utils";

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

connectDB();

export const options: NextAuthOptions = {
  pages: {
    signIn: "/",
    signOut: "/",
    newUser: "/register",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"phone" | "password", string> | undefined,
        req
      ) {
        if (credentials) {
          const user = await PatientModel.findOne({ phone: credentials.phone });
          if (!user) {
            throw new Error("Pas d'utilisateur avec ce numéro");
          }
          if (user.isBan) {
            throw new Error("Vous êtes banni");
          }
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isCorrectPassword) {
            throw new Error("Mot de passe incorrect");
          }

          const userAgent = req.headers && req.headers["user-agent"];
          // const { browser } = UAParser(userAgent);
          const { os } = UAParser(userAgent);

          const deviceType = detectDeviceType(os.name || "");
          // console.log("deviceType: " + deviceType);
          // console.log("os.name: " + os.name);
          const isoDate = new Date().toISOString();
          const ip = req.headers && req.headers["x-forwarded-for"];

          await PatientModel.findByIdAndUpdate(
            user._id,
            {
              $set: {
                deviceUsed: deviceType,
                lastConnexion: isoDate,
                lastIpUsed: ip,
              },
            },
            {
              new: true,
              runValidators: true,
            }
          );

          await VisitModel.create({
            userId: user._id,
            ipAdress: ip,
          });

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }
        return null; // Assurez-vous de retourner null si credentials est undefined
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    // async redirect({ url, baseUrl, token }) {
    //   if (token?.role === "DOCTEUR") {
    //     return baseUrl + "/dashboard";
    //   } else {
    //     return `${baseUrl}/patient/${token?.id}/profile#informations-personnelles`;
    //   }
    // },
  },
};
