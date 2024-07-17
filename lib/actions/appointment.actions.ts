"use server";

const twilio = require("twilio");
import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";
import { CreateAppointmentParams, UpdateAppointmentParams } from "@/types";
import {
  createPatientAppointment,
  deleteSingleAppointment,
  getAllAppointmentList,
  getPatientApppointment,
  getUserPatientAppointment,
  updateSingleAppointment,
} from "../api/appointment";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await createPatientAppointment(appointment);
    return parseStringify(newAppointment);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await getPatientApppointment(appointmentId);
    return parseStringify(appointment);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserAppointments = async (userId: string) => {
  try {
    const userAppointment = await getUserPatientAppointment(userId);
    return parseStringify(userAppointment);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      "668ac4440030872f1ffc",
      "668ac5130005ffa78400",
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") {
          acc.scheduledCount += 1;
        } else if (appointment.status === "pending") {
          acc.pendingCount += 1;
        } else if (appointment.status === "cancelled") {
          acc.cancelledCount += 1;
        }
        return acc;
      },
      initialCounts
    );
    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };
    return parseStringify(data);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAppointmentList = async () => {
  try {
    const appointments = await getAllAppointmentList();
    return parseStringify(appointments);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    // console.log(appointmentId, appointment);
    const updatedAppointment = updateSingleAppointment(
      appointmentId,
      appointment
    );

    if (!updatedAppointment) {
      throw new Error("Rendez-vous introuvable");
    }

    const accountSid = "AC609626b84b3215ac358bd2aefbe3ca91";
    const authToken = "475ee3789dcafefbfde0ce93160cfa08";
    const client = new twilio(accountSid, authToken);

    const smsMessage = `
        Bonjour, c'est MedicaleCare.${
          type === "schedule"
            ? `Votre rendez-vous a été programmé le ${
                formatDateTime(appointment.schedule!).dateTime
              } avec le Dr. ${appointment.primaryPhysician}`
            : `Nous avons le regret de vous informer que votre rendez-vous a été annulé pour la raison suivante:${appointment.cancellationReason}`
        }`;

    const messageR = await client.messages.create({
      body: smsMessage,
      to: "+212645456531", // Numéro de téléphone du destinataire
      from: "+13374014773", // Numéro de téléphone Twilio
    });

    revalidatePath("/admin");
    const updatedApp = parseStringify(updatedAppointment);
    const updateandmess = { updatedApp, messageR };
    return updateandmess;
    // return parseStringify(updatedAppointment);
  } catch (error: any) {
    // throw new Error(error.message);
    console.log(error);
  }
};

export const deleteAppointment = async (appointmentId: string) => {
  try {
    const appointmentDeleted = await deleteSingleAppointment(appointmentId);
    revalidatePath("/admin");
    return parseStringify(appointmentDeleted);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(ID.unique(), content, [userId]);
    return parseStringify(message);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
