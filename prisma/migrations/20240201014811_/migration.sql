-- AlterTable
ALTER TABLE `Booking` MODIFY `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Categoty_Of_POI` MODIFY `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `City` MODIFY `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Location` MODIFY `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Location_Activity` MODIFY `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Location_In_Tour` MODIFY `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Payment` MODIFY `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Payment_Method` MODIFY `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Point_Of_Interest` MODIFY `deleteAt` TIMESTAMP(0) NOT NULL DEFAULT ('0000-00-00 00:00:00');

-- AlterTable
ALTER TABLE `Tour` MODIFY `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Tour_Guide` MODIFY `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Trip` MODIFY `deleteAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Vehicle` MODIFY `deleteAt` DATETIME(3) NULL;
