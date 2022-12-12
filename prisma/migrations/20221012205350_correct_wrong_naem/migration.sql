/*
  Warnings:

  - Added the required column `genreId` to the `SubGenre` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubGenre" ADD COLUMN     "genreId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SubGenre" ADD CONSTRAINT "SubGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
