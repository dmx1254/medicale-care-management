"use client";
import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { verificationEmailForPasswordForget } from "@/lib/actions/verification.actions";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const SendEmail = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isCodeSending, setIsCodeSending] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const handleReturntoHome = () => {
    router.push("/");
  };

  const sendUserEmail = async () => {
    try {
      setIsSending(true);
      const response = await verificationEmailForPasswordForget(email);
      //   console.log(response);

      if (response?.user) {
        setIsSending(false);
        toast.success(
          "Nous avons envoyé un code de vérification. Merci de vérifier votre email et vos spams.",
          {
            style: {
              color: "#22c55e",
              background: "#0D0F10",
              border: "1px solid #363A3D",
            },
          }
        );
        const userId = response.user._id;
        const userIdToSend = userId.toString();
        new Promise((resolve) => {
          setTimeout(() => {
            router.push(`/mot-de-passe-oublie/${userIdToSend}`);
          }, 500);
          resolve(undefined);
        });
      } else if (response?.errorMessage) {
        toast.error(response?.errorMessage, {
          style: {
            color: "#dc2626",
            background: "#0D0F10",
            border: "1px solid #363A3D",
          },
        });
      } else {
        toast.error("Une erreur s'est produite", {
          style: {
            color: "#dc2626",
            background: "#0D0F10",
            border: "1px solid #363A3D",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsSending(false);
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-dark-200 border-dark-500 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>vérification d'email</DialogTitle>
          <DialogDescription>
            Nous vous enverrons un code sur cet email.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center text space-x-2">
          <div className="w-full max-w-[320px] flex flex-col items-start gap-3">
            <Label htmlFor="email" className="">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Saisissez votre Email"
              className="bg-transparent border-dark-500 text-white"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <Button
            size="sm"
            className="flex items-center gap-1 justify-center px-3 py-4 bg-green-600 text-green-500 border-green-900 mt-6"
            onClick={sendUserEmail}
            disabled={!isEmailValid}
            style={{
              opacity: isEmailValid ? 1 : 0.5,
            }}
          >
            {isSending && <Loader size={18} className="animate-pulse" />}

            {isSending ? "En cours..." : "Envoyer"}
          </Button>
        </div>

        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            className="text-white/80 font-semibold text-sm bg-red-600 text-red-500"
            onClick={handleReturntoHome}
          >
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SendEmail;
