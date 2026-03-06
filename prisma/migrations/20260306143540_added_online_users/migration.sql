-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "online" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Sockets" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Sockets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sockets_userId_key" ON "Sockets"("userId");

-- AddForeignKey
ALTER TABLE "Sockets" ADD CONSTRAINT "Sockets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
