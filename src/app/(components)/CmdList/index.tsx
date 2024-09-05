import React from "react";
import Cmd from "../Cmd";
import { Prisma } from "@prisma/client";
import Search from "../Search";
import { Plus } from "lucide-react";
import Link from "next/link";

type CmdPostWithUser = Prisma.CmdPostGetPayload<{ include: { user: true } }>;

interface CmdListProps {
  cmdPosts: CmdPostWithUser[];
}

const CmdList = ({ cmdPosts }: CmdListProps) => {
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="flex">
        <Search />
        <Link href="/snips/post">
          <button className="btn btn-circle btn-outline btn-accent ml-3">
            <Plus />
          </button>
        </Link>
      </div>
      <ul>
        {cmdPosts.map((cmdPost) => (
          <li className="mb-3" key={cmdPost.id}>
            <Cmd cmdPost={cmdPost} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CmdList;
