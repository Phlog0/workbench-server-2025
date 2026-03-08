/*
  Warnings:

  - You are about to drop the `Sockets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sockets" DROP CONSTRAINT "Sockets_userId_fkey";

-- DropTable
DROP TABLE "Sockets";

-- CreateTable
CREATE TABLE "Socket" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ProjectParticipant" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "projectId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "socketId" TEXT NOT NULL,

    CONSTRAINT "ProjectParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Socket_id_key" ON "Socket"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Socket_userId_key" ON "Socket"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectParticipant_socketId_key" ON "ProjectParticipant"("socketId");

-- CreateIndex
CREATE INDEX "ProjectParticipant_projectId_idx" ON "ProjectParticipant"("projectId");

-- CreateIndex
CREATE INDEX "ProjectParticipant_userId_idx" ON "ProjectParticipant"("userId");

-- CreateIndex
CREATE INDEX "ProjectParticipant_isOnline_idx" ON "ProjectParticipant"("isOnline");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectParticipant_userId_projectId_key" ON "ProjectParticipant"("userId", "projectId");

-- AddForeignKey
ALTER TABLE "Socket" ADD CONSTRAINT "Socket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectParticipant" ADD CONSTRAINT "ProjectParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectParticipant" ADD CONSTRAINT "ProjectParticipant_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectParticipant" ADD CONSTRAINT "ProjectParticipant_socketId_fkey" FOREIGN KEY ("socketId") REFERENCES "Socket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
