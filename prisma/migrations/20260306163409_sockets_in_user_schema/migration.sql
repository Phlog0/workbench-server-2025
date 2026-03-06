/*
  Warnings:

  - You are about to drop the column `online` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "online",
ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT false;
