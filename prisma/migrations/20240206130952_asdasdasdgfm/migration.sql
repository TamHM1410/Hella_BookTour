/*
  Warnings:

  - Added the required column `capacity` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Point_Of_Interest` MODIFY `deleteAt` TIMESTAMP(0) NOT NULL DEFAULT ('0000-00-00 00:00:00');

-- AlterTable
ALTER TABLE `Vehicle` ADD COLUMN `capacity` VARCHAR(191) NOT NULL;
