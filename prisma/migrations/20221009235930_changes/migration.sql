/*
  Warnings:

  - You are about to drop the column `startDate` on the `Artist` table. All the data in the column will be lost.
  - Added the required column `debutDate` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genreId` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "startDate",
ADD COLUMN     "debutDate" TEXT NOT NULL,
ADD COLUMN     "genreId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SubGenre" (
    "id" TEXT NOT NULL,

    CONSTRAINT "SubGenre_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
