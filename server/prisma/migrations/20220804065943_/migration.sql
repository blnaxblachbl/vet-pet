-- DropForeignKey
ALTER TABLE "Ad" DROP CONSTRAINT "Ad_petId_fkey";

-- AlterTable
ALTER TABLE "Ad" ALTER COLUMN "petId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
