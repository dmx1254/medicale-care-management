import StatCard from "@/components/StatCard";
import React from "react";
import { columns } from "@/components/patientable/columns";
import { DataTable } from "@/components/patientable/DataTable";
import { getAllPatients } from "@/lib/actions/patient.actions";

const PatientPage = async () => {
  const allPatients = await getAllPatients();
  // console.log(allPatients);

  return (
    // <div className="mx-auto flex max-w-7xl flex-col space-y-14">
    //   <main className="admin-main">
    //     <section className="w-full space-y-4">
    //       <h1 className="header">Bienvenue 👋</h1>
    //       <p className="text-dark-700">dans la page des patients</p>
    //     </section>
    //     <section className="admin-stat">
    //       <StatCard
    //         type="appointments"
    //         count={allPatients.length}
    //         label="Rendez-vous programmés"
    //         icon="/assets/icons/appointments.svg"
    //       />
    //       <StatCard
    //         type="pending"
    //         count={allPatients.length}
    //         label="Rendez-vous en attente"
    //         icon="/assets/icons/pending.svg"
    //       />
    //       <StatCard
    //         type="cancelled"
    //         count={allPatients.length}
    //         label="Rendez-vous annulés"
    //         icon="/assets/icons/cancelled.svg"
    //       />
    //     </section>
    //     <DataTable columns={columns} data={allPatients} />
    //   </main>
    // </div>

    <div className="mx-auto flex w-full flex-col space-y-14">
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Bienvenue 👋</h1>
          <p className="text-dark-700">dans la page des patients</p>
        </section>
        {/* <section className="admin-stat">
    <StatCard
      type="appointments"
      count={appointments?.scheduledCount}
      label="Rendez-vous programmés"
      icon="/assets/icons/appointments.svg"
    />
    <StatCard
      type="pending"
      count={appointments?.pendingCount}
      label="Rendez-vous en attente"
      icon="/assets/icons/pending.svg"
    />
    <StatCard
      type="cancelled"
      count={appointments?.cancelledCount}
      label="Rendez-vous annulés"
      icon="/assets/icons/cancelled.svg"
    />
  </section> */}
        <DataTable columns={columns} data={allPatients} />
      </main>
    </div>
  );
};

export default PatientPage;
