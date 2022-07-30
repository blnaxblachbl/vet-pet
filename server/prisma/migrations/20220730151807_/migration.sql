/*
  Warnings:

  - You are about to drop the `_AdminToBranch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AdminToBranch" DROP CONSTRAINT "_AdminToBranch_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdminToBranch" DROP CONSTRAINT "_AdminToBranch_B_fkey";

-- DropTable
DROP TABLE "_AdminToBranch";
