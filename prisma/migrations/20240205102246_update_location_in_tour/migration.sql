/*
  Warnings:

  - Added the required column `endCity` to the `Location_In_Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startCity` to the `Location_In_Tour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Location_In_Tour` ADD COLUMN `endCity` VARCHAR(191) NOT NULL,
    ADD COLUMN `startCity` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Point_Of_Interest` MODIFY `deleteAt` TIMESTAMP(0) NOT NULL DEFAULT ('0000-00-00 00:00:00');
