/*
  Warnings:

  - You are about to drop the column `vehicleId` on the `Tour` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vehicleTypeId]` on the table `Tour` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vehicleTypeId` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Tour_vehicleId_key` ON `Tour`;

-- AlterTable
ALTER TABLE `Point_Of_Interest` MODIFY `deleteAt` TIMESTAMP(0) NOT NULL DEFAULT ('0000-00-00 00:00:00');

-- AlterTable
ALTER TABLE `Tour` DROP COLUMN `vehicleId`,
    ADD COLUMN `vehicleTypeId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Tour_vehicleTypeId_key` ON `Tour`(`vehicleTypeId`);
