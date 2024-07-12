import { Gender, Status } from "@/types";

export const GenderOptions = ["homme", "femme", "autre"];

export const PatientFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  bloodgroup: "",
  vaccination: "",
  birthDate: new Date(),
  gender: "homme" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  password: "",
  confirmPassword: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Carte d'identité nationale",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
    "Acte de naissance",
    "Permis de conduire",
    "Carte d'assurance médicale/Police d'assurance",
    "Carte d'identité militaire",
    "Carte d'identité nationale",
    "Passeport",
    "Carte de résident permanent (Carte verte)",
    "Carte de sécurité sociale",
    "Carte d'identité d'État",
    "Carte d'identité étudiante",
    "Carte d'identité de votant",
  ];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
}