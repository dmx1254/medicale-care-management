import { LucideIcon } from "lucide-react";
import {
  UserRound,
  HeartPulse,
  KeySquare,
  Calendar,
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
  {
    id: "lpqza69",
    title: "Verification d'identite",
    slug: "verification-identite",
    icon: KeySquare,
  },
  {
    id: "zaplq25",
    title: "Mes rendez-vous",
    slug: "mes-rendez-vous",
    icon: Calendar,
  },
];
