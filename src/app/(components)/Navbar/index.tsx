"use client";

import { Home, LucideIcon, PlusCircleIcon } from "lucide-react";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavbarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const NavbarLink = ({ href, icon: Icon, label }: NavbarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div className={`cursor-pointer flex items-center justify-start`}>
        <Icon className="w-5 h-5 !text-green-400" />
        <span className="font-medium text-white ml-2">{label}</span>
      </div>
    </Link>
  );
};

interface AuthSectionProps {
  session: Session | null;
}

const AuthSection = ({ session }: AuthSectionProps) => {
  if (session) {
    return (
      <>
        <Image
          src={session.user?.image ?? ""}
          alt="Profile"
          width={30}
          height={30}
          className="rounded-full h-full object-cover"
        />
        {session.user?.name}
        <button
          className="bg-black p-3 rounded-lg border-b-2 border-cgreen-400"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </>
    );
  } else {
    return (
      <button
        className="bg-black p-3 rounded-lg border-b-2 border-cgreen-400"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    );
  }
};

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center w-full mb-7 border-b-2 border-green-700 px-5 py-5">
      <div className="flex justify-between items-center gap-5">
        <NavbarLink href="/snips" icon={Home} label="Snips" />
        <NavbarLink href="/addCmd" icon={PlusCircleIcon} label="Post" />
      </div>

      <div className="flex justify-between items-center gap-5">
        <AuthSection session={session} />
      </div>
    </div>
  );
};

export default Navbar;
