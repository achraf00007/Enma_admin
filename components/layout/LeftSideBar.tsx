import { navLinks } from "@/lib/constants";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function LeftSideBar() {
  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-1 shadow-xl max-lg:hidden">
      <Image src="/logo.png" alt="Enma" width={150} height={70} />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link key={link.label} href={link.url} className="flex gap-4 text-body-medium">
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 items-center text-body-medium">
        <UserButton />
        <p>Edit Profile</p>
      </div>

    </div>
  )
}