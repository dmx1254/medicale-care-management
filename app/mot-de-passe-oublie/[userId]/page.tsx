"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { restPasswordAndNew } from "@/lib/actions/verification.actions";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function ResetPasswordPage({
  params,
}: {
  params: { userId: string };
}) {
  const userId = params.userId;

  const [code, setCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [codeError, setCodeError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleResetPassword = async () => {
    if (
      !code ||
      !password ||
      password !== confirmPassword ||
      !/[!@#$%^&*()-+=;]/.test(password)
    ) {
      if (!code) {
        setCodeError("Le code doit avoir 6 caractères");
      }
      if (!password) {
        setPasswordError("Le mot de passe ne doit pas être vide");
      }
      if (password !== confirmPassword) {
        setConfirmPasswordError("Les mots de passe ne correspondent pas");
      }
      if (/[!@#$%^&*()-+=;]/.test(password) === false) {
        setPasswordError(
          "Le mot de passe doit contenir au moins un caractère spécial"
        );
      }
    } else {
      setCodeError("");
      setPasswordError("");
      setConfirmPasswordError("");
      try {
        setIsSubmitted(true);
        const response = await restPasswordAndNew(userId, code, password);
        if (response.successMessage) {
          setIsSubmitted(false);
          toast.success(response?.successMessage, {
            style: {
              color: "#22c55e",
              background: "#0D0F10",
              border: "1px solid #363A3D",
            },
          });
        } else if (response.errorMessage) {
          toast.error(response?.errorMessage, {
            style: {
              color: "#dc2626",
              background: "#0D0F10",
              border: "1px solid #363A3D",
            },
          });
        } else {
          toast.error(
            "Une erreur est survenue lors de la réinitialisation du mot de passe",
            {
              style: {
                color: "#dc2626",
                background: "#0D0F10",
                border: "1px solid #363A3D",
              },
            }
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    setIsSubmitted(false);
  };

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="medicale care"
            className="mb-12 h-10 w-fit"
          />
          <section className="mb-12 space-y-4">
            <h1 className="header">Bienvenue 👋</h1>
            <p className="text-dark-700">Remplir les infomations ci dessous.</p>
          </section>

          <div className="w-full flex flex-col items-start gap-4">
            <div className="w-full flex flex-col items-start gap-2">
              <Label htmlFor="forgotpassword">Code</Label>
              <Input
                id="forgotpassword"
                placeholder="Saisissez le code à 6 chiffres reçu"
                value={code}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCode(e.target.value)
                }
                className="w-full border-dark-500 bg-transparent text-white"
              />
              {codeError && (
                <p className="text-sm text-[#ef4444] my-1">{codeError}</p>
              )}
              <Label htmlFor="password" className="mt-2">
                Nouveau mot de passe
              </Label>
              <Input
                id="password"
                placeholder="Nouveau mot de passe"
                value={password}
                type="password"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="w-full border-dark-500 bg-transparent text-white"
              />
              {passwordError && (
                <p className="text-sm text-[#ef4444] my-1">{passwordError}</p>
              )}
              <Label htmlFor="confirmpassword" className="mt-2">
                Confirmer le nouveau mot de passe
              </Label>
              <Input
                id="confirmpassword"
                placeholder="Confirmation du nouveau mot de passe"
                type="password"
                value={confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full border-dark-500 bg-transparent text-white"
              />
              {confirmPasswordError && (
                <p className="text-sm text-[#ef4444] my-1">
                  {confirmPasswordError}
                </p>
              )}

              <Button
                variant="outline"
                className="flex items-center gap-1 w-full text-center border-green-900 bg-green-500 text-white mt-2"
                onClick={handleResetPassword}
                disabled={code.length < 6}
              >
                {isSubmitted && <Loader size={18} className="animate-pulse" />}
                {isSubmitted ? "Chargement..." : "Valider"}
              </Button>
            </div>
            {/* <div className="flex flex-col items-start gap-2"></div> */}
          </div>

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              &copy; 2024 MedicaleCare
            </p>
            <Link href="/" className="text-green-500">
              Se connecter
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        alt="medicale care"
        height={1000}
        width={1000}
        className="side-img max-w-[50%] sticky top-0 right-0 bottom-0"
      />
    </div>
  );
}
