"use client";
import { profileInfo } from "@/types/otherTypes";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
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

  return (
    <div className="flex h-screen max-h-screen">
      <div className="admin-profile">
        <div className="flex flex-col items-start gap-4">
          {profileInfo.map((profil) => (
            <Button
              key={profil.id}
              variant="ghost"
              className={clsx("flex items-center gap-2 text-white/70", {
                "bg-green-600": profil.slug === isSlugActive,
                "hover:bg-dark-300": profil.slug !== isSlugActive,
              })}
              onClick={() => handleSlug(profil.slug)}
              asChild
            >
              <Link href={`/patients/${userId}/#${profil.slug}`}>
                <profil.icon size={20} />
                <span className="text-[16px]">{profil.title}</span>
              </Link>
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          className="flex items-center gap-2 outline-none hover:text-red-500 text-white/70"
        >
          <LogOut />
          Logout
        </Button>
      </div>
      <section className="remove-scrollbar container ml-1 mr-4 my-6">
        {isSlugActive === "informations-personnelles" && (
          <PersonalInformations patient={patient} />
        )}
        {isSlugActive === "informations-medicales" && <MedicalesInformations />}
        {isSlugActive === "verification-identite" && <IdentityVerification />}
        {isSlugActive === "mes-rendez-vous" && <MyAppointment />}
        {/* <ProfilePage userId={userId} isSlugActive={isSlugActive} /> */}
      </section>
    </div>
  );
};

export default UserProfile;
