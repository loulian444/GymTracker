/*
  Warnings:

  - You are about to drop the `Exercise_Set` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `exerciseId` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise_Set" DROP CONSTRAINT "Exercise_Set_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Exercise_Set" DROP CONSTRAINT "Exercise_Set_setId_fkey";

-- AlterTable
ALTER TABLE "Set" ADD COLUMN     "exerciseId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Exercise_Set";

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
