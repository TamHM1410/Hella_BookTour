/*
  Warnings:

  - Made the column `locationId` on table `Location_In_Tour` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tourId` on table `Location_In_Tour` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Location_In_Tour` MODIFY `locationId` INTEGER NOT NULL,
    MODIFY `tourId` INTEGER NOT NULL;
