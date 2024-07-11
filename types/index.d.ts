/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "homme" | "femme" | "autre";
declare type Status = "pending" | "scheduled" | "cancelled";

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
}

declare type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};
