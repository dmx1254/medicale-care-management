import React, { useState } from "react";
import { SearchParamProps, User } from "@/types";
import ProfilePage from "@/components/ProfilePage";
import { getPatient } from "@/lib/actions/patient.actions";

const Profile = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient("6691863bfa95479a26ba88c1");
//   console.log(patient);

  return <ProfilePage patient={patient} userId={userId} />;
};

export default Profile;
