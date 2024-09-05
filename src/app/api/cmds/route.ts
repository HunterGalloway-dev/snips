import prisma from "@/app/db";
import { auth } from "@/auth";
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
  const { name, command } = data;

  const cmdPost = await prisma.cmdPost.create({
    data: {
      name: name.toString(),
      command: command.toString(),
      userId: session.user.id!,
    },
  });

  return NextResponse.json({ cmdPost }, { status: 200 });
}
