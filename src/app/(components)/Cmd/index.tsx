import { CmdPost, Prisma } from "@prisma/client";
import React from "react";
import CmdInput from "../CmdInput";

type CmdPostWithUser = Prisma.CmdPostGetPayload<{ include: { user: true } }>;

interface CmdPostProps {
  cmdPost: CmdPostWithUser;
}

const Cmd = ({ cmdPost }: CmdPostProps) => {
  return (
    <div>
      <div className="mockup-code">
        <pre data-prefix="" className="bg-accent text-base text-black">
          <code>{cmdPost.name}</code>
        </pre>
        {cmdPost.command.split("\n").map((line, i) => (
          <pre data-prefix="$" key={i}>
            <code>{line}</code>
          </pre>
        ))}
      </div>
      <p className="italic text-gray-400 text-xs">
        {cmdPost.createdAt.toLocaleString()} {cmdPost.user.name}
      </p>
    </div>
  );
};

export default Cmd;
