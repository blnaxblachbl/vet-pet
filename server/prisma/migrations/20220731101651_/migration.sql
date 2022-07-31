/*
  Warnings:

  - You are about to drop the column `endTine` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "endTine",
ADD COLUMN     "endTime" INTEGER NOT NULL DEFAULT 0;
