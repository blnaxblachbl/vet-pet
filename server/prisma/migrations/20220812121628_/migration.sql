/*
  Warnings:

  - You are about to drop the column `rating` on the `Organization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 4;

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "rating";
