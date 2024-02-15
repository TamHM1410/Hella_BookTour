/*
  Warnings:

  - A unique constraint covering the columns `[cityName]` on the table `City` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Location_cityId_key` ON `Location`;

-- AlterTable
ALTER TABLE `Point_Of_Interest` MODIFY `deleteAt` TIMESTAMP(0) NOT NULL DEFAULT ('0000-00-00 00:00:00');

-- CreateIndex
CREATE UNIQUE INDEX `City_cityName_key` ON `City`(`cityName`);
