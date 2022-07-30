-- CreateTable
CREATE TABLE "_AdminToBranch" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AdminToBranch_AB_unique" ON "_AdminToBranch"("A", "B");

-- CreateIndex
CREATE INDEX "_AdminToBranch_B_index" ON "_AdminToBranch"("B");

-- AddForeignKey
ALTER TABLE "_AdminToBranch" ADD CONSTRAINT "_AdminToBranch_A_fkey" FOREIGN KEY ("A") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminToBranch" ADD CONSTRAINT "_AdminToBranch_B_fkey" FOREIGN KEY ("B") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
