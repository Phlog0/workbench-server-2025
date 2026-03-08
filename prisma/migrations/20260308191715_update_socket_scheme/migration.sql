/*
  Warnings:

  - You are about to drop the `ProjectParticipant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projectId` to the `Socket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectParticipant" DROP CONSTRAINT "ProjectParticipant_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectParticipant" DROP CONSTRAINT "ProjectParticipant_socketId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectParticipant" DROP CONSTRAINT "ProjectParticipant_userId_fkey";

-- AlterTable
ALTER TABLE "Socket" ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "leftAt" TIMESTAMP(3),
ADD COLUMN     "projectId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProjectParticipant";

-- AddForeignKey
ALTER TABLE "Socket" ADD CONSTRAINT "Socket_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
