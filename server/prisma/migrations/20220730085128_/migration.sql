-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "dayOff" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "startTime" SET DEFAULT 0,
ALTER COLUMN "endTine" SET DEFAULT 0;
