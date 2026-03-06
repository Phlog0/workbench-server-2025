/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Sockets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Sockets_id_key" ON "Sockets"("id");
