"use client";

import { sidebarInfo } from "@/types/otherTypes";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="admin-profile-cop h-screen max-h-screen min-w-60">
      <div className="flex flex-col items-start gap-4">
        <div>
          <Image
            src="/assets/icons/logo-full.svg"
            height={100}
            width={100}
            alt="medicale care"
            className="mb-6 h-10 w-fit"
          />
        </div>

        {sidebarInfo.map((profil) => (
          <Button
            key={profil.id}
            variant="ghost"
            className={clsx(
              "cursor-pointer flex items-center gap-2 text-[#7A7C7E] opacity-70",
              {
                "text-green-500 opacity-90 hover:opacity-100":
                  profil.slug === pathname,

                "hover:opacity-100": profil.slug !== pathname,
              }
            )}
            asChild
          >
            <Link href={profil.slug} className="flex items-center gap-2">
              <profil.icon size={22} />
              {typeof profil.icon === "string" ? (
                <Image
                  src="/sidebar/home-lotie.svg"
                  alt={profil.title}
                  width={100}
                  height={100}
                />
              ) : (
                <span className="text-[16px] max-md:hidden">
                  {profil.title}
                </span>
              )}
            </Link>
          </Button>
        ))}
      </div>
      <Button
        variant="ghost"
        className="flex items-center gap-2 outline-none hover:text-red-500 text-[#7A7C7E]"
      >
        <LogOut />
        <span className="max-md:hidden">Logout</span>
      </Button>
    </div>
  );
};

export default Sidebar;
