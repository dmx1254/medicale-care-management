"use client";

import SendEmail from "@/components/SendEmail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function ForgetPasswordPage({ searchParams }: SearchParamProps) {
  const isOpenModal = (searchParams.isVerifiedEmail = "true");
  return (
    <div
      className="flex h-screen max-h-screen"
      style={{
        opacity: isOpenModal ? 0.1 : 1,
      }}
    >
      {isOpenModal && <SendEmail />}
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
                className="w-full border-dark-500 bg-transparent text-white"
              />
              <Button
                variant="outline"
                className="border-green-900 text-green-500 bg-green-600"
              >
                Valider
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
