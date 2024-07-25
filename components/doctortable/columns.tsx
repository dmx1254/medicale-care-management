"use client";

import { ColumnDef } from "@tanstack/react-table";

import { getPrimaryPhysicianPicture } from "@/lib/utils";
import Image from "next/image";
import { Patient } from "@/types";
import DeleteDocteur from "../docteurAction/DeleteDocteur";
import UpdateDocteur from "../docteurAction/UpdateDocteur";
import DocteurAction from "../docteurAction/DocteurAction";

export const columns: ColumnDef<Patient>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row?.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left">Docteur</div>,
    cell: ({ row }) => {
      const doctor = getPrimaryPhysicianPicture(row?.original.name);
      return (
        <div className="flex items-center gap-3">
          <Image
            src={row?.original?.profile ? row?.original?.profile : ""}
            alt={row?.original?.name}
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
    accessorKey: "phone",
    header: "Téléphone",
    cell: ({ row }) => <p className="text-14-medium">{row?.original.phone}</p>,
  },
  // {
  //   accessorKey: "gender",
  //   header: "Genre",
  //   cell: ({ row }) => (
  //     <p
  //       style={{
  //         color:
  //           row?.original.gender === "homme"
  //             ? "#a78bfa"
  //             : row.original.gender === "femme"
  //             ? "#f472b6"
  //             : "#22c55e",
  //         backgroundColor:
  //           row?.original.gender === "homme"
  //             ? "#4c1d95"
  //             : row.original.gender === "femme"
  //             ? "#831843"
  //             : "#14532d",
  //       }}
  //       className="status-12-semibold  capitalize status-badge"
  //     >
  //       {row?.original.gender}
  //     </p>
  //   ),
  // },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <p className="text-14-medium whitespace-nowrap">{row?.original.email}</p>
    ),
  },
  {
    accessorKey: "doctorStatus",
    header: "Status",
    cell: ({ row }) => (
      <div className="">
        {row?.original.doctorStatus ? (
          <span className="status-badge bg-yellow-900 text-yellow-500">
            En service
          </span>
        ) : (
          <span className="status-badge bg-blue-600 text-blue-500">
            Hors service
          </span>
        )}
      </div>
    ),
  },

  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1 max-xl:ml-4">
          <div className="flex items-center gap-3">
            <DeleteDocteur id={data._id} />
            <UpdateDocteur data={data} />
          </div>
          {/* <AppointmentModal
            type="schedule"
            patientId={data?.patientId}
            userId={data?.userId}
            phone={data?.phone}
            appointment={data}
          />
          <AppointmentModal
            type="cancel"
            patientId={data?.patientId}
            userId={data?.userId}
            appointment={data}
            phone={data?.phone}
          /> */}

          <DocteurAction data={data} />
        </div>
      );
    },
  },
];
