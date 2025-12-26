/*
  Warnings:

  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `info` on the `Project` table. All the data in the column will be lost.
  - The `id` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `projectId` on the `Cell10kV` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `projectId` on the `Fixation10kV` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `description` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `projectId` on the `Section10kV` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Cell10kV" DROP CONSTRAINT "Cell10kV_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Fixation10kV" DROP CONSTRAINT "Fixation10kV_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Section10kV" DROP CONSTRAINT "Section10kV_projectId_fkey";

-- AlterTable
ALTER TABLE "Cell10kV" DROP COLUMN "projectId",
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Fixation10kV" DROP COLUMN "projectId",
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
DROP COLUMN "info",
ADD COLUMN     "description" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Section10kV" DROP COLUMN "projectId",
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Section10kV" ADD CONSTRAINT "Section10kV_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixation10kV" ADD CONSTRAINT "Fixation10kV_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cell10kV" ADD CONSTRAINT "Cell10kV_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
