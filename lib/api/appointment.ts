import { CreateAppointmentParams } from "@/types";
import { connectDB } from "../db";
import AppointmentModel from "../models/appointment.model";
connectDB();

export async function createPatientAppointment(
  appointment: CreateAppointmentParams
) {
  try {
    const newAppointment = await AppointmentModel.create(appointment);
    return newAppointment;
  } catch (error) {
    console.log(error);
  }
}

export async function getPatientApppointment(appointmentId: string) {
  try {
    const appointment = await AppointmentModel.findById(appointmentId);
    return appointment;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserPatientAppointment(userId: string) {
  try {
    const usersAppointment = await AppointmentModel.find({ userId });
    return usersAppointment;
  } catch (error) {
    console.log(error);
  }
}
