"use client";

import SendEmail from "@/components/SendEmail";
import { SearchParamProps } from "@/types";

export default function ForgetPasswordPage({ searchParams }: SearchParamProps) {
  const isOpenModal = (searchParams.isVerifiedEmail = "true");
  return (
    <div
      className="flex h-screen max-h-screen"
      style={{
        opacity: isOpenModal ? 0.1 : 1,
      }}
    >
      {isOpenModal && <SendEmail />}
    </div>
  );
}
