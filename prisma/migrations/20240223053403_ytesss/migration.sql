-- DropIndex
DROP INDEX `Payment_paymentMethodId_key` ON `Payment`;

-- DropIndex
DROP INDEX `Tour_vehicleTypeId_key` ON `Tour`;

-- AlterTable
ALTER TABLE `Location` ADD COLUMN `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Point_Of_Interest` ADD COLUMN `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Tour` ADD COLUMN `image` VARCHAR(191) NULL;
