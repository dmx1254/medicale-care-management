import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Le Nom complet doit comporter au moins 2 caractères.")
    .max(50, "Le nom complet doit comporter au plus 50 caractères."),
  email: z.string().email("Adresse e-mail invalide"),
  phone: z.string().refine((phone) => /^\+?\d{9,15}$/.test(phone), "Numero de telephone invalide"),
});

// password: z
// .string()
// .regex(
//   /[\W]/,
//   "Le mot de passe doit comporter au moins 1 caractère spécial"
// )
// .min(6, "Le mot de passe doit comporter au moins 6 caractères.")
// .max(50, "Le mot de passe doit comporter au plus 50 caractères."),
