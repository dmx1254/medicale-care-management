import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { AppointmentResponse, Patient } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import StatusBadge from "../StatusBadge";
import AppointmentForm from "../forms/AppointmentForm";
import { getUserAppointments } from "@/lib/actions/appointment.actions";

const MyAppointment = ({
  patient,
  userId,
}: {
  patient: Patient;
  userId: string;
}) => {
  const [userApp, setUserApp] = useState<AppointmentResponse[]>([]);
  const [loading, setLoading] = useState(false);
  //   console.log(userApp);

  const getPrimaryPhysicianPicture = (doctorName: string) => {
    const doctor = Doctors.find((doc) => doc.name === doctorName);
    return doctor;
  };

  useEffect(() => {
    const fetchUserAppointments = async () => {
      setLoading(true);
      try {
        const appointments = await getUserAppointments(userId);
        setUserApp(appointments);
      } catch (error) {
        console.error("Error fetching user appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAppointments();
  }, [userId]);

  const doctor = Doctors.find((doc) => doc.name === "Alex Ramirez");
  return (
    <div className="flex flex-col items-start">
      {userApp?.map((app) => (
        <section key={app._id} className="request-details">
          <p>Détails du rendez-vous:</p>
          <div className="flex items-center gap-3">
            <Image
              src={getPrimaryPhysicianPicture(app.primaryPhysician)?.image}
              height={100}
              width={100}
              alt="doctor"
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {app?.primaryPhysician}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p>{formatDateTime(app.schedule).dateTime}</p>
          </div>
          <div className="min-w-[115px]">
            <StatusBadge status={app.status} />
          </div>
        </section>
      ))}
    </div>
  );
};

export default MyAppointment;
