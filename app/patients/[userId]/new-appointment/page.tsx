import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";


export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="medicale care"
            className="mb-12 h-10 w-fit"
          />
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={"668ed2600035e9bebd1e"}
          />
          <p className="copyright py-8">&copy; 2024 MedicaleCare</p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        alt="appointment"
        height={1000}
        width={1000}
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}