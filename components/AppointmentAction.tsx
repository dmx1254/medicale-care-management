"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";
import { AppointModal } from "@/types/appwrite.types";
import { deleteAppointment } from "@/lib/actions/appointment.actions";

const AppointmentAction = ({ data }: AppointModal) => {
  const [open, setOpen] = useState<boolean>(false);
  //   console.log(data);

  const handleDeleteAppointment = async (appointmentId: string) => {
    const appointmentDeleted = await deleteAppointment(appointmentId);
    try {
      if (appointmentDeleted) {
        toast.success(
          `Le rendez-vous avec ${appointmentDeleted.name} à été supprime avec succès`,
          {
            style: {
              color: "#22c55e",
              background: "#0D0F10",
              border: "1px solid #363A3D",
            },
          }
        );
      }
    } catch (error: any) {
      if (error.message) {
        toast.error(error.message, {
          style: {
            color: "red",
            background: "#0D0F10",
            border: "1px solid #363A3D",
          },
        });
      }
    }
    setOpen(false);
  };

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-dark-200 border-dark-300 w-full max-sm:p-2  max-sm:max-w-72 max-md:max-w-96">
          <AlertDialogHeader>
            <AlertDialogTitle className="max-sm:text-base">
              Êtes-vous absolument sûr ?
            </AlertDialogTitle>
            <AlertDialogDescription className="max-sm:text-sm">
              Cette action est irréversible. Cela supprimera définitivement ce
              rendez-vous.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-4">
            <button
              className="text-sm text-red-500 font-extrabold transition-all hover:opacity-80"
              onClick={() => setOpen(false)}
            >
              Annuler
            </button>
            <button
              className="text-sm text-green-500 font-extrabold transition-all hover:opacity-80"
              onClick={() => handleDeleteAppointment(data._id)}
            >
              Confirmer
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 p-0 border-none outline-none transition-all hover:opacity-80">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 mt-2" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-dark-300 z-50 border-dark-500 shadow-lg"
        >
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer transition-transform hover:opacity-80"
            onClick={() => {
              navigator.clipboard.writeText(data.name);
              toast.success("Numéro de téléphone copié dans la presse papier", {
                style: {
                  color: "#22c55e",
                  background: "#0D0F10",
                  border: "1px solid #363A3D",
                },
              });
            }}
          >
            Copier le téléphone
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer transition-all hover:opacity-80"
            onClick={() => setOpen(true)}
          >
            Supprimer
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer transition-all hover:opacity-80">
            Télécharger la fiche
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AppointmentAction;