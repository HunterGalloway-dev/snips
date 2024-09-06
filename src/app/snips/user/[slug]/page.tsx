import CmdList from "@/app/(components)/CmdList";
import prisma from "@/app/db";
import { auth } from "@/auth";
import React from "react";
import Image from "next/image";
import { Heart, SquareScissors } from "lucide-react";
import SnipsTab from "@/app/(components)/SnipsTab";

type Props = {};

const Profile = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let search = searchParams["search"]?.toString() ?? "";
  let tab = searchParams["tab"]?.toString() ?? "";
  const session = await auth();

  let sp = {};

  if (tab == "mylikes") {
    sp = {
      likes: {
        some: {
          userId: params.slug,
        },
      },
    };
  }

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
        sp,
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      likes: true,
    },
  });

  const snipCnt = await prisma.cmdPost.count({
    where: {
      userId: params.slug,
    },
  });

  const likeCnt = await prisma.postLike.count({
    where: {
      CmdPost: {
        userId: params.slug,
      },
    },
  });

  return (
    <div className="flex justify-center flex-col items-center space-y-5">
      <div className="stats ">
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
      </div>

      <div className="stats shadow ">
        <div className="stat">
          <div className="stat-figure text-primary">
            <SquareScissors />
          </div>
          <div className="stat-title">Total Snips</div>
          <div className="stat-value text-primary">{snipCnt}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <Heart className="fill-secondary" />
          </div>
          <div className="stat-title">Total Likes</div>
          <div className="stat-value text-secondary">{likeCnt}</div>
        </div>
      </div>
      <SnipsTab />

      <CmdList cmdPosts={cmdPosts} userList={true} />
    </div>
  );
};

export default Profile;
