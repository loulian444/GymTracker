/*
  Warnings:

  - You are about to drop the column `weekId` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the `Day_Exercise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Day" DROP CONSTRAINT "Day_weekId_fkey";

-- DropForeignKey
ALTER TABLE "Day_Exercise" DROP CONSTRAINT "Day_Exercise_dayId_fkey";

-- DropForeignKey
ALTER TABLE "Day_Exercise" DROP CONSTRAINT "Day_Exercise_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Day" DROP COLUMN "weekId";

-- DropTable
DROP TABLE "Day_Exercise";

-- CreateTable
CREATE TABLE "_DayToWeek" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DayToExercise" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DayToWeek_AB_unique" ON "_DayToWeek"("A", "B");

-- CreateIndex
CREATE INDEX "_DayToWeek_B_index" ON "_DayToWeek"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DayToExercise_AB_unique" ON "_DayToExercise"("A", "B");

-- CreateIndex
CREATE INDEX "_DayToExercise_B_index" ON "_DayToExercise"("B");

-- AddForeignKey
ALTER TABLE "_DayToWeek" ADD CONSTRAINT "_DayToWeek_A_fkey" FOREIGN KEY ("A") REFERENCES "Day"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayToWeek" ADD CONSTRAINT "_DayToWeek_B_fkey" FOREIGN KEY ("B") REFERENCES "Week"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayToExercise" ADD CONSTRAINT "_DayToExercise_A_fkey" FOREIGN KEY ("A") REFERENCES "Day"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayToExercise" ADD CONSTRAINT "_DayToExercise_B_fkey" FOREIGN KEY ("B") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
