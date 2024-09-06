/*
  Warnings:

  - You are about to drop the column `likes` on the `CmdPost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CmdPost" DROP COLUMN "likes";

-- CreateTable
CREATE TABLE "PostLike" (
    "id" SERIAL NOT NULL,
    "cmdPostId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PostLike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_cmdPostId_fkey" FOREIGN KEY ("cmdPostId") REFERENCES "CmdPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
