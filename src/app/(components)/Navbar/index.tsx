"use client";

import {
  Home,
  Icon,
  LucideIcon,
  PlusCircleIcon,
  SquareScissors,
} from "lucide-react";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();
  if (!session) {
    redirect("/snips");
  }
  const id = session.user!.id!;

  return (
    <div className="navbar bg-base-100 border-b-2 border-accent mb-5">
      <div className="flex-1">
        <Link href={"/snips"} className="btn btn-ghost text-xl">
          <SquareScissors />
          Snips
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                src={session.user?.image ?? ""}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full h-full object-cover"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between"></a>
              <Link href={`/snips/user/${id}`}>
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/", redirect: true })}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
