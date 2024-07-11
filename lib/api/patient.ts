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
