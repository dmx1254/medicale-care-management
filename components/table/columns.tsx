"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import StatusBadge from "../StatusBadge";
import { formatDateTime, getPrimaryPhysicianPicture } from "@/lib/utils";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";
import { Appointment } from "@/types/appwrite.types";
import { toast } from "sonner";
import AppointmentAction from "../AppointmentAction";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: "Patient",
    cell: ({ row }) => <p className="text-14-medium">{row.original.name}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Rendez vous",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: () => <div className="text-left">Docteur</div>,
    cell: ({ row }) => {
      const doctor = getPrimaryPhysicianPicture(row.original.primaryPhysician);
      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor ? doctor.image : ""}
            alt={doctor ? doctor.name : ""}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            patientId={data.patientId}
            userId={data.userId}
            phone={data.phone}
            appointment={data}
          />
          <AppointmentModal
            type="cancel"
            patientId={data.patientId}
            userId={data.userId}
            appointment={data}
            phone={data.phone}
          />

          <AppointmentAction data={data} />
        </div>
      );
    },
  },
];
