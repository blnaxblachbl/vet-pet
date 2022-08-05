/*
  Warnings:

  - You are about to drop the column `userId` on the `Pet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_userId_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" TEXT NOT NULL DEFAULT E'Пользователь';

-- CreateTable
CREATE TABLE "Adopt" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "petId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT E'new',

    CONSTRAINT "Adopt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Adopt" ADD CONSTRAINT "Adopt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adopt" ADD CONSTRAINT "Adopt_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
