import React from "react";
import { Patient } from "@/types";
import {
  HeartPulse,
  Stethoscope,
  Syringe,
  FileText,
  Shield,
  Phone,
  UserCheck,
  UserX,
  Activity,
} from "lucide-react";
import { Doctors } from "@/constants";
import Image from "next/image";

const MedicalInformations = ({ patient }: { patient: Patient }) => {
  const doctor = Doctors.find((doc) => doc.name === patient?.primaryPhysician);

  return (
    <div className="flex pb-12 border-b border-gray-800 flex-1 my-auto">
      <div className="flex flex-col items-start">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-8 xl:gap-6">
          <div className="flex flex-col items-start gap-2 text-base">
            <span className="flex items-center font-medium text-gray-300">
              <HeartPulse size={20} className="mr-2 text-red-500" />
              Groupe sanguin
            </span>
            <span className="p-2 rounded text-gray-400">
              {patient.bloodgroup}
            </span>
          </div>

          <div className="flex flex-col items-start gap-2 text-base">
            <span className="flex items-center font-medium text-gray-300">
              <Shield size={20} className="mr-2 text-yellow-500" />
              Allergies
            </span>
            <span className="p-2 rounded text-gray-400">
              {patient.allergies}
            </span>
          </div>

          <div className="flex flex-col items-start gap-2 text-base">
            <span className="flex items-center font-medium text-gray-300">
              <Syringe size={20} className="mr-2 text-green-500" />
              Médicaments actuels
            </span>
            <span className="p-2 rounded text-gray-400">
              {patient.currentMedication || "N/A"}
            </span>
          </div>

          <div className="flex flex-col items-start gap-2 text-base">
            <span className="flex items-center font-medium text-gray-300">
              <FileText size={20} className="mr-2 text-blue-500" />
              Antécédents familiaux
            </span>
            <span className="p-2 rounded text-gray-400">
              {patient.familyMedicalHistory || "N/A"}
            </span>
          </div>

          <div className="flex flex-col items-start gap-2 text-base">
            <span className="flex items-center font-medium text-gray-300">
              <FileText size={20} className="mr-2 text-blue-500" />
              Antécédents médicaux
            </span>
            <span className="p-2 rounded text-gray-400">
              {patient.pastMedicalHistory || "N/A"}
            </span>
          </div>

          <div className="flex flex-col items-start gap-2 text-base">
            <span className="flex items-center font-medium text-gray-300">
              <Stethoscope size={20} className="mr-2 text-purple-500" />
              Médecin traitant
            </span>
            <div className="flex items-center gap-3">
              <Image
                src={doctor?.image!}
                height={100}
                width={100}
                alt="doctor"
                className="size-8"
              />

              <div className="flex flex-col items-start gap-1">
                <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
                <p className="bg-dark-500 text-green-700 p-1 rounded-[10px] text-xs font-semibold">
                  {doctor?.speciality}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 text-base">
            <span className="flex items-center font-medium text-gray-300">
              <Activity size={20} className="mr-2 text-red-500" />
              Nom du contact d'urgence
            </span>
            <span className="p-2 rounded text-gray-400">
              {patient.emergencyContactName}
            </span>
          </div>

          <div className="flex flex-col items-start gap-2 text-base">
            <span className="flex items-center font-medium text-gray-300">
              <Phone size={20} className="mr-2 text-pink-500" />
              Numéro du contact d'urgence
            </span>
            <span className="p-2 rounded text-gray-400">
              {patient.emergencyContactNumber}
            </span>
          </div>

          <div className="flex flex-col items-start gap-2 text-base">
            <span className="flex items-center font-medium text-gray-300">
              <Shield size={20} className="mr-2 text-yellow-500" />
              Assurance
            </span>
            <span className="p-2 rounded text-gray-400">
              {patient.insuranceProvider}
            </span>
          </div>

          <div className="flex flex-col items-start gap-2 text-base">
            <span className="flex items-center font-medium text-gray-300">
              <Shield size={20} className="mr-2 text-yellow-500" />
              Numéro de police d'assurance
            </span>
            <span className="p-2 rounded text-gray-400">
              {patient.insurancePolicyNumber}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MedicalInformations;
