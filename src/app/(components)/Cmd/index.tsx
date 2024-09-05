import { CmdPost, Prisma } from "@prisma/client";
import React from "react";
import CmdInput from "../CmdInput";

type CmdPostWithUser = Prisma.CmdPostGetPayload<{ include: { user: true } }>;

interface CmdPostProps {
  cmdPost: CmdPostWithUser;
}

const Cmd = ({ cmdPost }: CmdPostProps) => {
  return (
    <div className="flex flex-col justify-center p-3 mb-2 rounded-md w-full">
      <p className="font-medium text-xl text-left w-full mb-1">
        {cmdPost.name}
      </p>
      <p className="italic text-gray-400 text-xs">
        {cmdPost.createdAt.toLocaleString()} {cmdPost.user.name}
      </p>
      <CmdInput
        value={cmdPost.command}
        isDisabled={true}
        name="name"
        placeholder=""
      />
    </div>
  );
};

export default Cmd;
