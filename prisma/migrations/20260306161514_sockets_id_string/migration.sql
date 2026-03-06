/*
  Warnings:

  - The primary key for the `Sockets` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Sockets" DROP CONSTRAINT "Sockets_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "Sockets_id_seq";
