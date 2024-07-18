import { isValidObjectId } from "mongoose";
import { UserRegister } from "@/types";
import { connectDB } from "../db";
import PatientModel from "../models/patient.model";
import bcrypt from "bcrypt";
import { parseStringify } from "../utils";
connectDB();

export async function createPatient(patient: UserRegister) {
  try {
    const isExistingUser = await PatientModel.findOne({ email: patient.email });
    if (isExistingUser)
      return {
        error: "Cet utilisateur avec cet email existe déjà",
        user: {},
        message: "",
      };

    const isPhoneExist = await PatientModel.findOne({ phone: patient.phone });
    if (isPhoneExist)
      return {
        error: "Cet utilisateur avec ce numéro de téléphone existe déjà",
        user: {},
        message: "",
      };

    const hashedPassword = await bcrypt.hash(patient.password, 10);
    const newUser = {
      ...patient,
      password: hashedPassword,
    };
    const savedUser = await PatientModel.create(newUser);
    const newuser = parseStringify(savedUser);
    return {
      error: "",
      user: newuser,
      message: "Inscription réussie ! Bienvenue parmi nous.",
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function login(phone: string, password: string) {
  return {
    phone: phone,
    password: password,
  };
}

export async function getOnePatient(userId: string) {
  try {
    const patientGeting = await PatientModel.findById(userId).select(
      "-password"
    );
    const patient = parseStringify(patientGeting);
    return patient;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function upadteEmailString(codeEmail: string, userId: string) {
  if (!isValidObjectId(userId)) {
    throw new Error("Invalid appointment ID");
  }

  const upadtedUserEmailString = await PatientModel.findByIdAndUpdate(
    userId,
    {
      emailStringVerified: codeEmail,
    },
    {
      new: true,
    }
  );
  return upadtedUserEmailString;
}

export async function iSEmailVerified(codeVerif: string, userId: string) {
  if (!isValidObjectId(userId)) {
    throw new Error("Invalid appointment ID");
  }

  try {
    const isUpadtedUser = await PatientModel.findById(userId);
    const isAlreadyEmailVerified = isUpadtedUser.isEmailVerified;
    if (isAlreadyEmailVerified)
      return {
        successMessage: "Votre adresse E-mail est déjà vérifié",
        errorMessage: "",
      };

    const emailString = isUpadtedUser.emailStringVerified;
    if (emailString === codeVerif) {
      const upadtedIsVerifEmail = await PatientModel.findByIdAndUpdate(
        userId,
        {
          isEmailVerified: true,
        },
        {
          new: true,
        }
      );
      return {
        successMessage: "Votre adresse E-mail a été vérifié avec succès",
        errorMessage: "",
      };
    }else{
        return {
            successMessage: "",
            errorMessage: "Le code que vous avez saisi est incorrect",
          };
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
