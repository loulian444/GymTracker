/*
  Warnings:

  - Made the column `age` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `height` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weight` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "age" SET NOT NULL,
ALTER COLUMN "height" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "weight" SET NOT NULL;
