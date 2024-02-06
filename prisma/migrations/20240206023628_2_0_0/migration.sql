-- DropIndex
DROP INDEX `Booking_userId_key` ON `Booking`;

-- AlterTable
ALTER TABLE `Booking` MODIFY `bookingDate` VARCHAR(191) NOT NULL,
    MODIFY `fromDate` VARCHAR(191) NOT NULL,
    MODIFY `toDate` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Point_Of_Interest` MODIFY `deleteAt` TIMESTAMP(0) NOT NULL DEFAULT ('0000-00-00 00:00:00');
