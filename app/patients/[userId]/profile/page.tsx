import { SearchParamProps } from "@/types";
import ProfilePage from "@/components/ProfilePage";
import {
  getPatient,
  getPatientPrescription,
} from "@/lib/actions/patient.actions";
import { getDoctorsInService } from "@/lib/actions/doctor.actions";
import { getScheduledDate } from "@/lib/actions/appointment.actions";
import { Suspense } from "react";
import ProfileSkeletons from "@/components/skelletons/ProfileSkeletons";

const Profile = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  const actifsDoctors = await getDoctorsInService();
  const inactivesDates = await getScheduledDate();
  const result = await getPatientPrescription(userId);
  // console.log(inactivesDates);
  const prescriptions = result?.prescriptions;
  const unreadPrescriptions = result?.unreadPrescriptions;

  return (
    <Suspense key={userId} fallback={<ProfileSkeletons />}>
      <ProfilePage
        inactivesDates={inactivesDates}
        patient={patient}
        userId={userId}
        doctors={actifsDoctors}
        prescriptions={prescriptions}
        unreadPrescriptions={unreadPrescriptions}
      />
    </Suspense>
  );
};

export default Profile;
