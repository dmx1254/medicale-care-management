"use client";
import { profileInfo } from "@/types/otherTypes";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { Patient, User } from "@/types";
import PersonalInformations from "./profile/PersonalInformations";
import MedicalesInformations from "./profile/MedicalesInformations";
import IdentityVerification from "./profile/IdentityVerification";
import MyAppointment from "./profile/MyAppointment";
import clsx from "clsx";

const UserProfile = ({
  userId,
  patient,
}: {
  userId: string;
  patient: Patient;
}) => {
  const [isSlugActive, setIsSlugActive] = useState<string>(
    "informations-personnelles"
  );

  //   console.log(patient);
  const handleSlug = (activeSlug: string) => {
    setIsSlugActive(activeSlug);
  };
  //   const handleSetActive = (slug: string) => {
  //     console.log(to);
  //   };

  return (
    <div className="flex space-y-14" id="informations-personnelles">
      <div className="admin-profile-cop h-screen max-h-screen">
        <div className="flex flex-col items-start gap-4">
          {profileInfo.map((profil) => (
            <Button
              key={profil.id}
              variant="ghost"
              className={clsx(
                "cursor-pointer flex items-center gap-2 text-white/70",
                {
                  "bg-green-600 w-full": profil.slug === isSlugActive,
                  "hover:bg-dark-300": profil.slug !== isSlugActive,
                }
              )}
              onClick={() => handleSlug(profil.slug)}
              asChild
            >
              <Link
                to={`${profil.slug}`}
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                style={{ display: "block", width: "100%" }}
                // onSetActive={handleSetActive}
              >
                <p className="flex items-center gap-2">
                  <profil.icon size={22} />
                  <span className="text-[16px] max-md:hidden">
                    {profil.title}
                  </span>
                </p>
              </Link>
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          className="flex items-center gap-2 outline-none hover:text-red-500 text-white/70"
        >
          <LogOut />
          <span className="max-md:hidden">Logout</span>
        </Button>
      </div>
      <main className="admin-main remove-scrollbar container my-auto">
        <section className="w-full space-y-4">
          <h1 className="header">Bienvenue 👋</h1>
          <p className="font-extrabold text-14-regular text-green-500">
            {patient.name}
          </p>
        </section>

        <section className="w-full space-y-4 stat-card">
          <section className="space-y-4">
            <div className="mb-3 space-y-1">
              <h2 className="sub-header">Informations Personnelles</h2>
            </div>
          </section>

          <PersonalInformations patient={patient} />
          <section className="space-y-4" id="informations-medicales">
            <div className="mb-3 space-y-1">
              <h2 className="sub-header">Informations Médicales</h2>
            </div>
          </section>

          <MedicalesInformations patient={patient} />
          <section className="space-y-4" id="verification-identite">
            <div className="mb-3 space-y-1">
              <h2 className="sub-header">Verification d'identités</h2>
            </div>
          </section>
          <IdentityVerification patient={patient} />
          <section className="space-y-4" id="mes-rendez-vous">
            <div className="mb-3 space-y-1">
              <h2 className="sub-header">Mes rendez vous</h2>
            </div>
          </section>
          <MyAppointment patient={patient} />
        </section>
      </main>
    </div>
  );
};

export default UserProfile;
