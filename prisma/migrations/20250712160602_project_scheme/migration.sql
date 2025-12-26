/*
  Warnings:

  - You are about to drop the `Cell10kV` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fixation10kV` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Section10kV` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cell10kV" DROP CONSTRAINT "Cell10kV_fixation10kVId_fkey";

-- DropForeignKey
ALTER TABLE "Cell10kV" DROP CONSTRAINT "Cell10kV_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Fixation10kV" DROP CONSTRAINT "Fixation10kV_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Fixation10kV" DROP CONSTRAINT "Fixation10kV_section10kVId_fkey";

-- DropForeignKey
ALTER TABLE "Section10kV" DROP CONSTRAINT "Section10kV_projectId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "projectScheme" JSONB;

-- DropTable
DROP TABLE "Cell10kV";

-- DropTable
DROP TABLE "Fixation10kV";

-- DropTable
DROP TABLE "Section10kV";
