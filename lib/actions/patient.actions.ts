"use server";

import { ID, Query } from "node-appwrite";
import { databases, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";
import {
  createPatient,
  deleteOnePatient,
  getOnePatient,
  getPatients,
  login,
} from "../api/patient";
import { CreateUserParams, UserRegister } from "@/types";
import { revalidatePath } from "next/cache";

export const loginUser = async (user: CreateUserParams) => {
  try {
    const { phone, password } = user;
    const response = await login(phone, password);
    // console.log(response);
  } catch (error: any) {
    console.log(error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patient = await getOnePatient(userId);

    return patient;
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async (patient: UserRegister) => {
  try {
    const response = await createPatient(patient);
    if (response.error) {
      throw new Error(response.error);
    } else {
      return response;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllPatients = async () => {
  try {
    const patients = await getPatients();
    return parseStringify(patients);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deletePatient = async (patientId: string) => {
  try {
    const patientDeleted = await deleteOnePatient(patientId);
    revalidatePath("/dashboard/patients");
    return parseStringify(patientDeleted);
  } catch (error: any) {
    throw new Error(error);
  }
};
