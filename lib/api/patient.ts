import { isValidObjectId } from "mongoose";
import { DoctorUpdate, UserRegister } from "@/types";
import { connectDB } from "../db";
import PatientModel from "../models/patient.model";
import bcrypt from "bcrypt";
import { parseStringify } from "../utils";
import PrescriptionModel from "../models/prescriptions.models";
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
    console.log(error);
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
    console.log(error);
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

export async function upadteEmailPasswordString(
  codeEmail: string,
  email: string
) {
  const upadtedUserEmailString = await PatientModel.updateOne(
    { email: email },
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
          emailStringVerified: "",
        },
        {
          new: true,
        }
      );
      return {
        successMessage: "Votre adresse E-mail a été vérifié avec succès",
        errorMessage: "",
      };
    } else {
      return {
        successMessage: "",
        errorMessage: "Le code que vous avez saisi est incorrect",
      };
    }
  } catch (error: any) {
    console.log(error);
  }
}

export async function getPatients() {
  try {
    const patientsFinding = await PatientModel.find({
      isAdmin: false,
      role: "PATIENT",
    })
      .sort({ createdAt: -1 })
      .select("-password")
      .select("-identificationDocument");
    const allPatientCount = PatientModel.countDocuments({
      isAdmin: false,
      role: "PATIENT",
    });

    const allPatientBan = PatientModel.countDocuments({
      isBan: true,
      isAdmin: false,
      role: "PATIENT",
    });
    const allPatientActif = PatientModel.countDocuments({
      isBan: false,
      isAdmin: false,
      role: "PATIENT",
    });

    const [patients, patientsCount, patientsBan, patientsActif] =
      await Promise.all([
        patientsFinding,
        allPatientCount,
        allPatientBan,
        allPatientActif,
      ]);
    return { patients, patientsCount, patientsBan, patientsActif };
  } catch (error: any) {
    console.error(`Error fetching patients: ${error}`);
  }
}

export async function deleteOnePatient(patientId: string) {
  if (!isValidObjectId(patientId)) {
    throw new Error("Invalid appointment ID");
  }
  try {
    const patientDeleted = await PatientModel.findByIdAndDelete(patientId);
    return patientDeleted;
  } catch (error: any) {
    throw new Error(`Error to deleting patient: ${error.message}`);
  }
}

export async function BanOnePatient(patientId: string) {
  if (!isValidObjectId(patientId)) {
    throw new Error("Invalid appointment ID");
  }
  try {
    const patientBan = await PatientModel.findByIdAndUpdate(
      patientId,
      {
        isBan: true,
      },
      {
        new: true,
      }
    );
    return patientBan;
  } catch (error: any) {
    throw new Error(`Error to ban patient: ${error.message}`);
  }
}

export async function deBanOnePatient(patientId: string) {
  if (!isValidObjectId(patientId)) {
    throw new Error("Invalid appointment ID");
  }
  try {
    const patientDeban = await PatientModel.findByIdAndUpdate(
      patientId,
      {
        isBan: false,
      },
      {
        new: true,
      }
    );
    return patientDeban;
  } catch (error: any) {
    throw new Error(`Error to ban patient: ${error.message}`);
  }
}

export async function UpdatePatientMedi(
  patientId: string,
  bloodgroup: string,
  insuranceProvider: string,
  insurancePolicyNumber: string,
  allergies: string,
  primaryPhysician: string
) {
  if (!isValidObjectId(patientId)) {
    throw new Error("Invalid appointment ID");
  }
  try {
    const medicalPatientUpdate = await PatientModel.findByIdAndUpdate(
      patientId,
      {
        bloodgroup,
        insuranceProvider,
        insurancePolicyNumber,
        allergies,
        primaryPhysician,
      },
      {
        new: true,
      }
    );
    return medicalPatientUpdate;
  } catch (error: any) {
    throw new Error(`Error to update medicale patient: ${error.message}`);
  }
}

export async function deleteOneDoctor(patientId: string) {
  if (!isValidObjectId(patientId)) {
    throw new Error("Invalid appointment ID");
  }
  try {
    const doctorDeleted = await PatientModel.findByIdAndDelete(patientId);
    return doctorDeleted;
  } catch (error: any) {
    throw new Error(`Error to deleting patient: ${error.message}`);
  }
}

export async function updateOneSingleDoctor(
  patientId: string,
  doctorDataUpdate: DoctorUpdate
) {
  if (!isValidObjectId(patientId)) {
    throw new Error("Invalid appointment ID");
  }
  try {
    const doctorUpdated = await PatientModel.findByIdAndUpdate(
      patientId,
      doctorDataUpdate,
      {
        new: true,
      }
    );
    return doctorUpdated;
  } catch (error: any) {
    throw new Error(`Error to updating doctor: ${error.message}`);
  }
}

export async function updateSingleDoctorStatus(
  patientId: string,
  doctorStatus: boolean
) {
  if (!isValidObjectId(patientId)) {
    throw new Error("Invalid appointment ID");
  }
  try {
    const doctorStatusUpdated = await PatientModel.findByIdAndUpdate(
      patientId,
      {
        doctorStatus,
      },
      {
        new: true,
      }
    );
    return doctorStatusUpdated;
  } catch (error: any) {
    throw new Error(`Error to updating doctor status: ${error.message}`);
  }
}

export async function findUserByEmail(email: string) {
  try {
    const user = await PatientModel.findOne({
      email: email,
    });
    if (user) return { user: user, message: "" };
    return { user: {}, message: "Pas d'utilisateur trouvé avec cet Email" };
  } catch (error: any) {
    throw new Error(`Error to retrieve user: ${error.message}`);
  }
}

export async function resetUserPassword(
  userId: string,
  code: string,
  password: string
) {
  if (!isValidObjectId(userId)) {
    throw new Error("Invalid User ID");
  }

  try {
    const isUpadtedUser = await PatientModel.findById(userId);

    const emailString = isUpadtedUser.emailStringVerified;
    if (emailString === code) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await PatientModel.findByIdAndUpdate(
        userId,
        {
          $set: { password: hashedPassword, emailStringVerified: "" },
        },

        { new: true, runValidators: true }
      );

      return {
        successMessage: "Votre mot de passe a été réinitialisé avec succès",
        errorMessage: "",
      };
    } else {
      return {
        successMessage: "",
        errorMessage: "Le code que vous avez saisi est incorrect",
        user: null,
      };
    }
  } catch (error: any) {
    console.log(error);
  }
}

export async function getAllPatientPrescriptions(userId: string) {
  try {
    const prescriptions = await PrescriptionModel.find({ patientId: userId });
    const unreadPrescriptions = await PrescriptionModel.countDocuments({
      read: false,
    });

    const patientPrescriptions = parseStringify(prescriptions);
    const unread = parseStringify(unreadPrescriptions);
    return { prescriptions: patientPrescriptions, unreadPrescriptions: unread };
  } catch (error: any) {
    console.log(error);
  }
}
