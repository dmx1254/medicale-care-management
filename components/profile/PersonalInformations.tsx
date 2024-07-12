import React from "react";
import { Patient } from "@/types";
import {
  BadgeCheck,
  Mail,
  Phone,
  XCircle,
  BriefcaseMedical,
} from "lucide-react";
import Image from "next/image";
import ModalImage from "react-modal-image";

const PersonalInformations = ({ patient }: { patient: Patient }) => {
//   console.log(patient);

  return (
    <div className="flex flex-1 my-auto">
      <div className="flex flex-col items-start">
        <section className="space-y-4">
          <h1 className="header">Bienvenue 👋</h1>
          <p className="font-extrabold text-14-regular text-green-500">
            {patient.name}
          </p>
        </section>
        <section className="space-y-4 mt-12">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Informations Personnelles</h2>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="flex flex-col items-start gap-2 text-sm">
            <span className="font-medium">Prénom et nom</span>
            <span className="p-2 rounded bg-gray-200 text-gray-700">
              {patient.name}
            </span>
          </div>

          <div className="flex flex-col items-start gap-2 text-sm">
            <span className="font-medium">Adresse E-mail</span>
            <div className="p-2 rounded bg-gray-200 text-gray-700">
              <div className="flex items-center gap-2">
                <Mail className="text-gray-600" size={16} />
                <span>{patient.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Status :</span>&nbsp;
                {patient.isEmailVerified ? (
                  <span className="flex items-center gap-1 text-green-500">
                    verified
                    <BadgeCheck size={15} className="mt-0.5" />
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-500">
                    not verified
                    <XCircle size={15} className="mt-0.5" />
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 text-sm">
            <span className="font-medium">Téléphone</span>
            <div className="p-2 rounded bg-gray-200 text-gray-700">
              <div className="flex items-center gap-2">
                <Phone className="text-gray-600" size={16} />
                <span>{patient.phone}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Status :</span>&nbsp;
                {patient.isPhoneVerified ? (
                  <span className="flex items-center gap-1 text-green-500">
                    verified
                    <BadgeCheck size={15} className="mt-0.5" />
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-500">
                    not verified
                    <XCircle size={15} className="mt-0.5" />
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 text-sm">
            <span className="font-medium">Date de naissance</span>
            <span className="p-2 rounded bg-gray-200 text-gray-700">
              {new Date(patient.birthDate).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex flex-col items-start gap-2 text-sm">
            <span className="font-medium">Adresse</span>
            <span className="p-2 rounded bg-gray-200 text-gray-700">
              {patient.address}
            </span>
          </div>

          <div className="flex flex-col items-start gap-2 text-sm">
            <span className="font-medium">Genre</span>
            <span className="p-2 rounded bg-gray-200 text-gray-700">
              {patient.gender}
            </span>
          </div>

          <div className="flex flex-col items-start gap-2 text-sm">
            <span className="font-medium">Profession</span>
            <span className="p-2 rounded bg-gray-200 text-gray-700">
              {patient.occupation}
            </span>
          </div>

          <div className="flex flex-col items-start gap-2 text-sm">
            <span className="font-medium">Type d'identification</span>
            <span className="p-2 rounded bg-gray-200 text-gray-700">
              {patient.identificationType}
            </span>
          </div>

          <div className="flex flex-col items-start gap-2 text-sm">
            <span className="font-medium">Numero d'identification</span>
            <span className="p-2 rounded bg-gray-200 text-gray-700">
              {patient.identificationNumber}
            </span>
          </div>
          <div className="flex flex-col items-start gap-2 text-sm">
            <span className="font-medium">Document d'identification</span>
            <ModalImage
              small={patient.identificationDocument}
              large={patient.identificationDocument}
              alt="Document d'identification"
              className="cursor-pointer rounded"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PersonalInformations;
