import { SearchParamProps } from "@/types";
import ProfilePage from "@/components/ProfilePage";
import { getPatient } from "@/lib/actions/patient.actions";
import { getDoctorsInService } from "@/lib/actions/doctor.actions";
import { getScheduledDate } from "@/lib/actions/appointment.actions";

const Profile = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  const actifsDoctors = await getDoctorsInService();
  const inactivesDates = await getScheduledDate();
  // console.log(inactivesDates);

  return (
    <ProfilePage inactivesDates={inactivesDates} patient={patient} userId={userId} doctors={actifsDoctors} />
  );
};

export default Profile;
