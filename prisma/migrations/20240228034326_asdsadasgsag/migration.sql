/*
  Warnings:

  - You are about to drop the column `endDate` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Trip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Trip` DROP COLUMN `endDate`,
    DROP COLUMN `startDate`;
