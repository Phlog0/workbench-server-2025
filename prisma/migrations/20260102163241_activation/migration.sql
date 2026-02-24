-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activated" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "ActivationLink" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "ActivationLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActivationLink_userId_key" ON "ActivationLink"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ActivationLink_userId_link_key" ON "ActivationLink"("userId", "link");

-- AddForeignKey
ALTER TABLE "ActivationLink" ADD CONSTRAINT "ActivationLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
