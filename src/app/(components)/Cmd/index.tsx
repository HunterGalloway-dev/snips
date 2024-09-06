import { CmdPost, Prisma } from "@prisma/client";
import React from "react";
import CmdInput from "../CmdInput";
import { Bookmark, Edit, Heart, Trash } from "lucide-react";
import Link from "next/link";
import { Session } from "inspector/promises";
import { auth } from "@/auth";
import ConditionalRender from "../ConditionaRender";

type CmdPostWithUser = Prisma.CmdPostGetPayload<{ include: { user: true } }>;

interface CmdPostProps {
  cmdPost: CmdPostWithUser;
}

const Cmd = async ({ cmdPost }: CmdPostProps) => {
  const session = await auth();
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

  return (
    <div>
      <div className="mockup-code py-4">
        <pre data-prefix="" className="bg-accent text-base text-black">
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
              <button className="">
                <Heart size={20} className="text-accent" />
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
          <Link href={`/snips/user/${session?.user?.id}`}>
            <p className="link link-accent">/{session?.user?.name}</p>
          </Link>
          <p className="ml-2">{getTimeSince(cmdPost.createdAt)} ago</p>
        </div>
      </div>
    </div>
  );
};

export default Cmd;
