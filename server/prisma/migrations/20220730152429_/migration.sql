/*
  Warnings:

  - You are about to drop the `_AdminToBranch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AdminToOrganization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AdminToBranch" DROP CONSTRAINT "_AdminToBranch_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdminToBranch" DROP CONSTRAINT "_AdminToBranch_B_fkey";

-- DropForeignKey
ALTER TABLE "_AdminToOrganization" DROP CONSTRAINT "_AdminToOrganization_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdminToOrganization" DROP CONSTRAINT "_AdminToOrganization_B_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "organizationId" TEXT;

-- DropTable
DROP TABLE "_AdminToBranch";

-- DropTable
DROP TABLE "_AdminToOrganization";

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
