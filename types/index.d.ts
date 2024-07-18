/* eslint-disable no-unused-vars */

export type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type Gender = "homme" | "femme" | "autre";
export type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  phone: string;
  password: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  name: string;
  password: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  primaryPhysician: string;
  vaccination: string;
  bloodgroup: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: string;
  privacyConsent: boolean;
}

export interface UserRegister {
  address: string;
  allergies?: string;
  birthDate: Date;
  bloodgroup: string;
  currentMedication: string;
  disclosureConsent: boolean;
  email: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  familyMedicalHistory: string;
  gender: string;
  identificationNumber: string;
  identificationType: string;
  insurancePolicyNumber: string;
  insuranceProvider: string;
  name: string;
  occupation: string;
  password: string;
  pastMedicalHistory: string;
  phone: string;
  primaryPhysician: string;
  privacyConsent: boolean;
  treatmentConsent: boolean;
  vaccination: string;
  role?: string;
}

export interface Patient {
  _id: string;
  address: string;
  allergies: string;
  birthDate: Date;
  bloodgroup: string;
  currentMedication: string;
  disclosureConsent: boolean;
  email: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  familyMedicalHistory: string;
  gender: string;
  identicationNumber: string;
  identificationDocument: string;
  identificationType: string;
  insurancePolicyNumber: string;
  insuranceProvider: string;
  name: string;
  occupation: string;
  identificationNumber: string;
  pastMedicalHistory: string;
  phone: string;
  primaryPhysician: string;
  privacyConsent: boolean;
  treatmentConsent: boolean;
  vaccination: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isBan: boolean;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  patient: Patient;
  userId?: string;
}

export type CreateAppointmentParams = {
  userId: string;
  patientId: string;
  primaryPhysicianId: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  name: string;
  note: string | undefined;
};

export interface AppointmentUpdate {
  primaryPhysician: string;
  schedule: Date;
  status: string;
  cancellationReason: string;
}

export type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  phone: string;
  appointment: AppointmentUpdate;
  type: string;
};

export interface AppointmentResponse {
  _id: string;
  patientId?: string;
  userId: string;
  status: string;
  primaryPhysician: string;
  reason: string;
  primaryPhysicianId: string;
  note: string;
  cancellationReason: string;
  schedule: Date;
  createdAt?:string;
  updatedAt?:string;
}

export interface Doc {
  image: string;
  name: string;
}
