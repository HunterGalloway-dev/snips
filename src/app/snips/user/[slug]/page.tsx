import CmdList from "@/app/(components)/CmdList";
import prisma from "@/app/db";
import { auth } from "@/auth";
import React from "react";
import Image from "next/image";

type Props = {};

const Profile = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let search = searchParams["search"]?.toString() ?? "";
  const session = await auth();

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
      AND: [
        {
          user: {
            id: params.slug,
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

  const snipCnt = await prisma.cmdPost.count({
    where: {
      userId: params.slug,
    },
  });

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="stats mb-5">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <Image
                  src={session?.user?.image ?? ""}
                  alt="Profile"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
          <div className="stat-value">{session?.user?.name}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary"></div>
          <div className="stat-title">Snips</div>
          <div className="stat-value text-accent">{snipCnt}</div>
          <div className="stat-desc"># of snips</div>
        </div>
      </div>
      <CmdList cmdPosts={cmdPosts} />
    </div>
  );
};

export default Profile;
