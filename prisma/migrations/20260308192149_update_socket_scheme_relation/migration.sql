-- DropForeignKey
ALTER TABLE "Socket" DROP CONSTRAINT "Socket_projectId_fkey";

-- AlterTable
ALTER TABLE "Socket" ALTER COLUMN "joinedAt" DROP NOT NULL,
ALTER COLUMN "projectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Socket" ADD CONSTRAINT "Socket_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
