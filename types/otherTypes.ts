import { LucideIcon } from "lucide-react";
import {
  UserRound,
  HeartPulse,
  KeySquare,
  Calendar,
  House,
  CalendarCheck,
  BriefcaseMedical
} from "lucide-react";

type profilePerso = {
  id: string;
  title: string;
  slug: string;
  icon: LucideIcon;
};

export const profileInfo: profilePerso[] = [
  {
    id: "koaps30",
    title: "Informations Personnelles",
    slug: "informations-personnelles",
    icon: UserRound,
  },
  {
    id: "pawxd74",
    title: "Informations Medicales",
    slug: "informations-medicales",
    icon: HeartPulse,
  },
  //   {
  //     id: "lpqza69",
  //     title: "Verification d'identite",
  //     slug: "verification-identite",
  //     icon: KeySquare,
  //   },
  {
    id: "zaplq25",
    title: "Mes rendez-vous",
    slug: "mes-rendez-vous",
    icon: Calendar,
  },
];

export const sidebarInfo: profilePerso[] = [
  {
    id: "koaps30",
    title: "Home",
    slug: "/dashboard",
    icon: House,
  },
  {
    id: "pawxd74",
    title: "Rendez vous",
    slug: "/dashboard/rendez-vous",
    icon: CalendarCheck,
    // HeartPulse
  },
  {
    id: "lpqza69",
    title: "Patienst",
    slug: "/dashboard/patients",
    icon: HeartPulse,
  },
  {
    id: "zazlq25",
    title: "Docteurs",
    slug: "/dashboard/docteurs",
    icon: BriefcaseMedical,
  },
  {
    id: "zaplq72",
    title: "Settings",
    slug: "/dashboard/settings",
    icon: Calendar,
  },
];
