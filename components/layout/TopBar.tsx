"use client";

import { navLinks } from "@/lib/constants";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function TopBar() {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-gradient-to-r from-primary-100 to-primary-300 shadow-xl lg:hidden">
      <Image src="/logo.png" alt="Enma" width={150} height={70} />

      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.url}
            className={`flex gap-4 text-body-medium ${pathname === link.url ? "text-primary-700 font-bold" : "text-grey-1"}`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="relative flex gap-4 items-center text-body-medium">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setDropDownMenu(!dropDownMenu)}
        />
        {dropDownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 shadow-xl bg-white rounded-lg">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.url}
                className={`flex gap-4 text-body-medium ${pathname === link.url ? "text-primary-700 font-bold" : "text-grey-1"}`}
              >
                {link.icon} <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
}
