import prisma from "@/app/db";
import { getServerSession, unstable_getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  const prismaUser = await prisma.user.findUnique({
    where: { email: session.user?.email! },
  });

  if (!prismaUser) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  const { name, command } = data;

  const cmdPost = await prisma.cmdPost.create({
    data: {
      name: name.toString(),
      command: command.toString(),
      userId: prismaUser.id,
    },
  });

  return NextResponse.json({ cmdPost }, { status: 200 });
}
