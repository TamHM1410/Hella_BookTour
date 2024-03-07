/*
  Warnings:

  - You are about to drop the column `fromDate` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `toDate` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `fromDate`,
    DROP COLUMN `toDate`;

-- AlterTable
ALTER TABLE `Location_In_Tour` MODIFY `locationId` INTEGER NULL,
    MODIFY `tourId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Point_Of_Interest` MODIFY `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Trip` ADD COLUMN `endDate` VARCHAR(191) NULL,
    ADD COLUMN `startDate` VARCHAR(191) NULL;
