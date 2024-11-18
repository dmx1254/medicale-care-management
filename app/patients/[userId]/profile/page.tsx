import { SearchParamProps } from "@/types";
import ProfilePage from "@/components/ProfilePage";
import { getPatient } from "@/lib/actions/patient.actions";
import { getDoctorsInService } from "@/lib/actions/doctor.actions";
import { getScheduledDate } from "@/lib/actions/appointment.actions";
import { Suspense } from "react";
import ProfileSkeletons from "@/components/skelletons/ProfileSkeletons";

const Profile = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  const actifsDoctors = await getDoctorsInService();
  const inactivesDates = await getScheduledDate();
  // console.log(inactivesDates);

  return (
    <Suspense key={userId} fallback={<ProfileSkeletons />}>
      <ProfilePage
        inactivesDates={inactivesDates}
        patient={patient}
        userId={userId}
        doctors={actifsDoctors}
      />
    </Suspense>
  );
};

export default Profile;
