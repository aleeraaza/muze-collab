/*
  Warnings:

  - Added the required column `bThumbnail` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mThumbnail` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sThumbnail` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "bThumbnail" TEXT NOT NULL,
ADD COLUMN     "channel" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "mThumbnail" TEXT NOT NULL,
ADD COLUMN     "sThumbnail" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
