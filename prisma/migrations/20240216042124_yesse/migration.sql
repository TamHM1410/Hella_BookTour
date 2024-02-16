/*
  Warnings:

  - You are about to drop the column `locationAdress` on the `Location` table. All the data in the column will be lost.
  - Added the required column `locationAddress` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Location` DROP COLUMN `locationAdress`,
    ADD COLUMN `locationAddress` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Point_Of_Interest` MODIFY `deleteAt` TIMESTAMP(0) NOT NULL DEFAULT ('0000-00-00 00:00:00');
