/*
  Warnings:

  - Added the required column `bankDetails` to the `Payment_Method` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Payment_Method` ADD COLUMN `bankDetails` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Point_Of_Interest` MODIFY `deleteAt` TIMESTAMP(0) NOT NULL DEFAULT ('0000-00-00 00:00:00');
