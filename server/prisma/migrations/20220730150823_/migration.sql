/*
  Warnings:

  - You are about to drop the column `address` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the `Stock` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[branchId]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `branchId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branchId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_organizationId_fkey";

-- DropIndex
DROP INDEX "Schedule_organizationId_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "branchId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "address",
DROP COLUMN "images",
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "organizationId",
ADD COLUMN     "branchId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Stock";

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publish" BOOLEAN NOT NULL DEFAULT true,
    "delete" BOOLEAN NOT NULL DEFAULT false,
    "organizationId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdminToBranch" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BranchToGood" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AdminToBranch_AB_unique" ON "_AdminToBranch"("A", "B");

-- CreateIndex
CREATE INDEX "_AdminToBranch_B_index" ON "_AdminToBranch"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BranchToGood_AB_unique" ON "_BranchToGood"("A", "B");

-- CreateIndex
CREATE INDEX "_BranchToGood_B_index" ON "_BranchToGood"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_branchId_key" ON "Schedule"("branchId");

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminToBranch" ADD CONSTRAINT "_AdminToBranch_A_fkey" FOREIGN KEY ("A") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminToBranch" ADD CONSTRAINT "_AdminToBranch_B_fkey" FOREIGN KEY ("B") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BranchToGood" ADD CONSTRAINT "_BranchToGood_A_fkey" FOREIGN KEY ("A") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BranchToGood" ADD CONSTRAINT "_BranchToGood_B_fkey" FOREIGN KEY ("B") REFERENCES "Good"("id") ON DELETE CASCADE ON UPDATE CASCADE;
