import RegisterForm from "@/components/forms/RegisterForm";
import { getDoctorsInService } from "@/lib/actions/doctor.actions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { options } from "../api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";

const Register = async () => {
  const session = await getServerSession(options);
  if (session)
    redirect(`/patients/${session?.user.id}/profile#informations-personnelles`);
  const actifsDoctors = await getDoctorsInService();
  // console.log(actifsDoctors);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="medicale care"
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm doctors={actifsDoctors} />
          <div className="copyright py-6 text-14-regular mt-2 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              &copy; 2024 MedicaleCare
            </p>
            <Link href="/" className="text-green-500">
              se connecter
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        alt="medicale care"
        height={1000}
        width={1000}
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
