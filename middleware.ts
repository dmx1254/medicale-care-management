import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { token } = req.nextauth;

    if (
      token &&
      (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/register")
    ) {
      // Redirige l'utilisateur connecté vers sa page de profil s'il essaie d'accéder à / ou /register
      return NextResponse.redirect(
        new URL(
          `/patients/${token?.id}/profile#informations-personnelles`,
          req.url
        )
      );
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/",
      signOut: "/",
      newUser: "/register",
    },
  }
);

export const config = {
  matcher: ["/patients/:path*"],
};
