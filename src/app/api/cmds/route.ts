import prisma from "@/app/db";
import { auth } from "@/auth";
import { CmdPost } from "@prisma/client";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  const { name, command, id } = data;

  let cmdPost: CmdPost;
  if (id) {
    cmdPost = await prisma.cmdPost.update({
      where: {
        id: Number(id.toString()),
      },
      data: {
        name: name.toString(),
        command: name.toString(),
      },
    });
  } else {
    cmdPost = await prisma.cmdPost.create({
      data: {
        name: name.toString(),
        command: command.toString(),
        userId: session.user.id!,
      },
    });
  }

  return NextResponse.json({ cmdPost }, { status: 201 });
}
