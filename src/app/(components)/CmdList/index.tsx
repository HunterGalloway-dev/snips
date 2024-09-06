import React from "react";
import Cmd from "../Cmd";
import { Prisma } from "@prisma/client";
import Search from "../Search";
import { Plus } from "lucide-react";
import Link from "next/link";
import ConditionalRender from "../ConditionaRender";

type CmdPostWithUser = Prisma.CmdPostGetPayload<{
  include: { user: true; likes: true };
}>;

interface CmdListProps {
  cmdPosts: CmdPostWithUser[];
  userList: boolean;
}

const CmdList = ({ cmdPosts, userList }: CmdListProps) => {
  return (
    <div className="flex justify-center flex-col items-center w-full">
      <div className="flex">
        <Search />
        <ConditionalRender show={!userList}>
          <Link href="/snips/post">
            <button className="btn btn-circle btn-outline btn-accent ml-3">
              <Plus />
            </button>
          </Link>
        </ConditionalRender>
      </div>
      <ul className="lg:w-1/2 md:w-1/2 sm:w-96 space-y-5">
        {cmdPosts.map((cmdPost) => (
          <li key={cmdPost.id}>
            <Cmd cmdPost={cmdPost} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CmdList;
