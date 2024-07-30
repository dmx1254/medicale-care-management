import React, { useState } from "react";
import { SearchParamProps, User } from "@/types";
import ProfilePage from "@/components/ProfilePage";
import { getPatient } from "@/lib/actions/patient.actions";
import { getDoctorsInService } from "@/lib/actions/doctor.actions";

const Profile = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  const actifsDoctors = await getDoctorsInService();
//   console.log(patient);

  return <ProfilePage patient={patient} userId={userId} doctors={actifsDoctors} />;
};

export default Profile;
