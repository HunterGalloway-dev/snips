import React, { FormEvent, useState } from "react";
import Cmd from "../(components)/Cmd";
import { SearchIcon } from "lucide-react";
import { CmdPost } from "@prisma/client";
import { useRouter } from "next/navigation";
import prisma from "../db";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import Search from "../(components)/Search";

const Snips = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let search = searchParams["search"]?.toString() ?? "";

  const cmdPosts = await prisma.cmdPost.findMany({
    where: {
      OR: [
        {
          command: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="flex justify-center flex-col items-center w-screen">
      <Search />
      <ul className="w-1/2">
        {cmdPosts.map((cmdPost) => (
          <li className="w-full" key={cmdPost.id}>
            <Cmd cmdPost={cmdPost} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Snips;
