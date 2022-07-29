/*
  Warnings:

  - You are about to drop the column `organizationId` on the `Admin` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_organizationId_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "organizationId";

-- CreateTable
CREATE TABLE "_AdminToOrganization" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AdminToOrganization_AB_unique" ON "_AdminToOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_AdminToOrganization_B_index" ON "_AdminToOrganization"("B");

-- AddForeignKey
ALTER TABLE "_AdminToOrganization" ADD CONSTRAINT "_AdminToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminToOrganization" ADD CONSTRAINT "_AdminToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
