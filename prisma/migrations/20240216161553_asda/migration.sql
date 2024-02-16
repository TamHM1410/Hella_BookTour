-- DropIndex
DROP INDEX `Booking_tripId_key` ON `Booking`;

-- DropIndex
DROP INDEX `Location_Activity_locationId_key` ON `Location_Activity`;

-- DropIndex
DROP INDEX `Location_In_Tour_locationId_key` ON `Location_In_Tour`;

-- DropIndex
DROP INDEX `Location_In_Tour_tourId_key` ON `Location_In_Tour`;

-- DropIndex
DROP INDEX `Payment_bookingId_key` ON `Payment`;

-- DropIndex
DROP INDEX `Point_Of_Interest_categoryPOI_ID_key` ON `Point_Of_Interest`;

-- DropIndex
DROP INDEX `Point_Of_Interest_locationId_key` ON `Point_Of_Interest`;

-- DropIndex
DROP INDEX `Trip_tourGuideId_key` ON `Trip`;

-- DropIndex
DROP INDEX `Trip_tourId_key` ON `Trip`;

-- AlterTable
ALTER TABLE `Point_Of_Interest` MODIFY `deleteAt` TIMESTAMP(0) NOT NULL DEFAULT ('0000-00-00 00:00:00');
