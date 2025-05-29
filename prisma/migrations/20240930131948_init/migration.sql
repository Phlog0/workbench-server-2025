-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('RP', 'TP', 'KTP');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "projectType" "ProjectType" NOT NULL DEFAULT 'RP',
    "title" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section10kV" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "voltage" INTEGER NOT NULL,
    "position" JSONB NOT NULL,
    "draggable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Section10kV_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fixation10kV" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "section10kVId" TEXT NOT NULL,
    "position" JSONB NOT NULL,

    CONSTRAINT "Fixation10kV_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cell10kV" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "fixation10kVId" TEXT,
    "position" JSONB NOT NULL,
    "draggable" BOOLEAN NOT NULL DEFAULT true,
    "typeOfCell" TEXT,
    "typeOfSwithcingDevice" TEXT,
    "swithcingDeviceR" JSONB,
    "swithcingDeviceVV" JSONB,
    "swithcingDeviceVN" JSONB,
    "tt" JSONB,
    "mircoproc" JSONB,
    "tn" JSONB,
    "tsn" JSONB,
    "opn" JSONB,
    "ratedCurrentOfTheMainCircuits_10kV" INTEGER NOT NULL,

    CONSTRAINT "Cell10kV_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Section10kV" ADD CONSTRAINT "Section10kV_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixation10kV" ADD CONSTRAINT "Fixation10kV_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixation10kV" ADD CONSTRAINT "Fixation10kV_section10kVId_fkey" FOREIGN KEY ("section10kVId") REFERENCES "Section10kV"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cell10kV" ADD CONSTRAINT "Cell10kV_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cell10kV" ADD CONSTRAINT "Cell10kV_fixation10kVId_fkey" FOREIGN KEY ("fixation10kVId") REFERENCES "Fixation10kV"("id") ON DELETE SET NULL ON UPDATE CASCADE;
