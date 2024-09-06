import prisma from "@/app/db";
import { auth } from "@/auth";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const id = Number(params.slug);

  const cmdPost = await prisma.cmdPost.findFirst({
    where: {
      id: id,
    },
  });

  return Response.json({ cmdPost }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const id = Number(params.slug);

  const session = await auth();

  if (!session?.user) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }

  let cmdPost = await prisma.cmdPost.findFirst({
    where: {
      id: id,
    },
  });

  if (cmdPost?.userId != session.user.id) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }

  cmdPost = await prisma.cmdPost.delete({
    where: {
      id: id,
    },
  });

  return Response.json({ cmdPost }, { status: 200 });
}
