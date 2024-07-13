import React from "react";
import { Patient } from "@/types";
import {
  BadgeCheck,
  Mail,
  Phone,
  BriefcaseMedical,
  Calendar,
  MapPin,
  UsersRound,
  FileText,
  Cake,
  BriefcaseBusiness,
  BookText,
  ShieldCheck,
  Contact,
} from "lucide-react";

import ModalImage from "react-modal-image";

const PersonalInformations = ({ patient }: { patient: Patient }) => {
  //   console.log(patient);

  return (
    <div className="flex pb-12 border-b border-gray-800 flex-1 my-auto">
      <div className="flex flex-col items-start">
        <section className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="flex flex-col items-start gap-2 text-base">
            <span className="font-medium text-gray-300">Prénom et nom</span>

            {patient.name ? (
              <div className="flex items-center p-2 rounded gap-1 text-gray-400">
                <Contact className="text-gray-600" size={19} />
                <span>{patient.name}</span>
              </div>
            ) : (
              "N/A"
            )}
          </div>

          <div className="flex flex-col items-start gap-2 text-base">
            <span className="font-medium text-gray-300">Adresse E-mail</span>

            {patient.email ? (
              <div className="p-2 rounded  text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="text-gray-600" size={16} />
                  <span>{patient.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Status :</span>&nbsp;
                  {!patient.isEmailVerified ? (
                    <span className="flex items-center gap-1 text-green-500">
                      verified
                      <BadgeCheck size={15} className="mt-0.5" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-600 opacity-70">
                      not verified
                      <BadgeCheck size={15} className="mt-0.5" />
                    </span>
                  )}
                </div>
              </div>
            ) : (
              "N/A"
            )}
          </div>

          <div className="flex flex-col items-start gap-2 text-base">
            <span className="font-medium text-gray-300">Téléphone</span>

            {patient.phone ? (
              <div className="p-2 rounded  text-gray-400">
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
                    <span className="flex items-center gap-1 text-red-500 opacity-70">
                      not verified
                      <BadgeCheck size={15} className="mt-0.5" />
                    </span>
                  )}
                </div>
              </div>
            ) : (
              "N/A"
            )}
          </div>

          <div className="flex flex-col items-start gap-2 text-base">
            <span className="font-medium text-gray-300">Date de naissance</span>

            {patient.birthDate ? (
              <div className="flex items-center p-2 rounded gap-1 text-gray-400">
                <Cake className="text-gray-600" size={19} />
                <span className="text-gray-400">
                  {new Date(patient.birthDate).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            ) : (
              "N/A"
            )}
          </div>

          <div className="flex flex-col items-start gap-2 text-base">
            <span className="font-medium text-gray-300">Adresse</span>

            {patient.address ? (
              <div className="flex items-start p-2 rounded gap-1 text-gray-400">
                <MapPin className="text-gray-600" size={24} />
                <span>{patient.address}</span>
              </div>
            ) : (
              "N/A"
            )}
          </div>

          <div className="flex flex-col items-start gap-2 text-base">
            <span className="font-medium text-gray-300">Genre</span>

            {patient.gender ? (
              <div className="flex items-center p-2 rounded gap-1 text-gray-400">
                <UsersRound className="text-gray-600" size={20} />
                <span>{patient.gender}</span>
              </div>
            ) : (
              "N/A"
            )}
          </div>

          <div className="flex flex-col items-start gap-2 text-base">
            <span className="font-medium text-gray-300">Profession</span>
            {patient.occupation ? (
              <div className="flex items-center p-2 rounded gap-1 text-gray-400">
                <BriefcaseBusiness className="text-gray-600" size={20} />
                <span>{patient.occupation}</span>
              </div>
            ) : (
              "N/A"
            )}
          </div>

          <div className="flex flex-col items-start gap-2 text-base">
            <span className="font-medium text-gray-300">
              Type d'identification
            </span>

            {patient.identificationType ? (
              <div className="flex items-center p-2 rounded gap-1 text-gray-400">
                <BookText className="text-gray-600" size={18} />
                <span>{patient.identificationType}</span>
              </div>
            ) : (
              "N/A"
            )}
          </div>

          <div className="flex flex-col items-start gap-2 text-base">
            <span className="font-medium text-gray-300">
              Numero d'identification
            </span>
            {patient.identificationNumber ? (
              <div className="flex items-center p-2 rounded gap-1 text-gray-400">
                <ShieldCheck className="text-gray-600" size={18} />
                <span>{patient.identificationNumber}</span>
              </div>
            ) : (
              "N/A"
            )}
          </div>
          <div className="flex flex-col items-start gap-2 text-base">
            <span className="font-medium text-gray-300">
              Document d'identification
            </span>
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
