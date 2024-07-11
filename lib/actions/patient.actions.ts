"use server";

import { ID, Query } from "node-appwrite";
import { databases, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";
import { createPatient, login } from "../api/patient";
import { CreateUserParams, UserRegister } from "@/types";

export const loginUser = async (user: CreateUserParams) => {
  try {
    const { phone, password } = user;
    const response = await login(phone, password);
    console.log(response);
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
    const patients = await databases.listDocuments(
      "668ac4440030872f1ffc",
      "668ac49000107ff71508",
      [Query.equal("userId", userId)]
    );
    return parseStringify(patients.documents[0]);
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
