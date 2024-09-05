-- CreateTable
CREATE TABLE "CmdPost" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "command" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CmdPost_pkey" PRIMARY KEY ("id")
);
