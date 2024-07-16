"use server";

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
  getPatientApppointment,
  getUserPatientAppointment,
} from "../api/appointment";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await createPatientAppointment(appointment);
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await getPatientApppointment(appointmentId);
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};


export const getUserAppointments = async (userId: string) => {
  try {
    const userAppointment = await getUserPatientAppointment(userId);
    return parseStringify(userAppointment);
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      "668ac4440030872f1ffc",
      "668ac5130005ffa78400",
      appointmentId,
      appointment
    );
    if (!updatedAppointment) {
      throw new Error("Rendez-vous introuvable");
    }

    const smsMessage = `
    Bonjour, c'est MedicaleCare.
    ${
      type === "schedule"
        ? `Votre rendez-vous a été programmé à ${
            formatDateTime(appointment.schedule!).dateTime
          } avec le Dr. ${appointment.primaryPhysician}`
        : `Nous avons le regret de vous informer que votre rendez-vous a été annulé pour la raison suivante:
        ${appointment.cancellationReason}`
    }
   `;

    await sendSMSNotification(userId, smsMessage);

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(ID.unique(), content, [userId]);
    return parseStringify(message);
  } catch (error) {
    console.log(error);
  }
};
