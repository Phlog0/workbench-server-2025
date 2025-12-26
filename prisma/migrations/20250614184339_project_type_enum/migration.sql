/*
  Warnings:

  - The values [RP,TP,KTP] on the enum `ProjectType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProjectType_new" AS ENUM ('ТП', 'КТП', 'РП');
ALTER TABLE "Project" ALTER COLUMN "projectType" DROP DEFAULT;
ALTER TABLE "Project" ALTER COLUMN "projectType" TYPE "ProjectType_new" USING ("projectType"::text::"ProjectType_new");
ALTER TYPE "ProjectType" RENAME TO "ProjectType_old";
ALTER TYPE "ProjectType_new" RENAME TO "ProjectType";
DROP TYPE "ProjectType_old";
ALTER TABLE "Project" ALTER COLUMN "projectType" SET DEFAULT 'КТП';
COMMIT;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "projectType" SET DEFAULT 'КТП';

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_userId_key" ON "RefreshToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
