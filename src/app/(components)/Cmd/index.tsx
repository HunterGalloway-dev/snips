"use client";

import { CmdPost, Prisma } from "@prisma/client";
import React, { useState } from "react";
import CmdInput from "../CmdInput";
import { Bookmark, Edit, Heart, Trash } from "lucide-react";
import Link from "next/link";
import { Session } from "inspector/promises";
import { auth } from "@/auth";
import ConditionalRender from "../ConditionaRender";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type CmdPostWithUser = Prisma.CmdPostGetPayload<{
  include: { user: true; likes: true };
}>;

interface CmdPostProps {
  cmdPost: CmdPostWithUser;
}

const Cmd = ({ cmdPost }: CmdPostProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const liked = cmdPost.likes.some((e) => e.userId == session!.user!.id);

  const getTimeSince = (date: Date) => {
    const now = Date.now();

    const diff = Math.abs(date.getTime() - now);

    const secondsDiff = Math.floor(diff / 1000);
    const minutesDiff = Math.floor(secondsDiff / 60);
    const hoursDiff = Math.floor(minutesDiff / 60);
    const dayDiff = Math.floor(hoursDiff / 24);
    const monthDiff = Math.floor(dayDiff / 30);

    if (secondsDiff < 60) {
      return `${secondsDiff}sec`;
    }

    if (minutesDiff < 60) {
      return `${minutesDiff}min`;
    }

    if (hoursDiff < 24) {
      return `${hoursDiff}h`;
    }

    if (dayDiff < 30) {
      return `${dayDiff}d`;
    }

    return `${monthDiff}mo`;
  };

  const onLike = async () => {
    const result = await fetch(`/api/cmds/${cmdPost.id}`, {
      method: "POST",
    });

    if (result.status == 200) {
      router.refresh();
    }
  };

  return (
    <div>
      <div className="mockup-code py-4 lg:text-lg md:text-base sm:text-xs">
        <pre data-prefix="" className="bg-accent text-base-100">
          <code>{cmdPost.name}</code>
        </pre>
        {cmdPost.command.split("\n").map((line, i) => (
          <pre data-prefix="$" key={i}>
            <code>{line}</code>
          </pre>
        ))}
        <div className="flex px-2 mt-2">
          <div className="flex-1">
            <div className="tooltip" data-tip="Like">
              <button className="" onClick={onLike}>
                <Heart
                  size={20}
                  className={`text-accent ${liked ? "fill-accent" : ""}`}
                />
                {cmdPost.likes.length}
              </button>
            </div>
          </div>
          <ConditionalRender show={cmdPost.userId == session?.user?.id}>
            <div className="flex-none">
              <Link href={`/snips/post/${cmdPost.id}`}>
                <Edit size={20} className="text-accent" />
              </Link>
            </div>
          </ConditionalRender>
        </div>
        <div className="mt-2 w-full flex justify-center">
          <Link href={`/snips/user/${cmdPost.userId}`}>
            <p className="link link-accent">/{cmdPost.user.name}</p>
          </Link>
          <p className="ml-2">{getTimeSince(cmdPost.createdAt)} ago</p>
        </div>
      </div>
    </div>
  );
};

export default Cmd;
