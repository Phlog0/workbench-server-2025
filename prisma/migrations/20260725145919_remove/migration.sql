/*
  Warnings:

  - You are about to drop the `Socket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Socket" DROP CONSTRAINT "Socket_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Socket" DROP CONSTRAINT "Socket_userId_fkey";

-- DropTable
DROP TABLE "Socket";
