/*
  Warnings:

  - You are about to drop the column `storyId` on the `Media` table. All the data in the column will be lost.
  - Added the required column `type` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Media_storyId_unique";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originUrl" TEXT NOT NULL,
    "contentUrl" TEXT,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Media" ("contentUrl", "createdAt", "id", "originUrl", "updatedAt") SELECT "contentUrl", "createdAt", "id", "originUrl", "updatedAt" FROM "Media";
DROP TABLE "Media";
ALTER TABLE "new_Media" RENAME TO "Media";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
