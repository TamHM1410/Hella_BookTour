-- CreateTable
CREATE TABLE `City` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cityName` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cityId` INTEGER NOT NULL,
    `locationName` VARCHAR(191) NOT NULL,
    `locationAdress` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Location_cityId_key`(`cityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location_Activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `locationId` INTEGER NOT NULL,
    `activityName` VARCHAR(191) NOT NULL,
    `activityDuration` VARCHAR(191) NOT NULL,
    `activityDescription` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Location_Activity_locationId_key`(`locationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoty_Of_POI` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Point_Of_Interest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `POIName` VARCHAR(191) NOT NULL,
    `POIDescription` VARCHAR(191) NOT NULL,
    `locationId` INTEGER NOT NULL,
    `categoryPOI_ID` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Point_Of_Interest_locationId_key`(`locationId`),
    UNIQUE INDEX `Point_Of_Interest_categoryPOI_ID_key`(`categoryPOI_ID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vehicleName` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tour` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tourName` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `price` DOUBLE NOT NULL,
    `vehicleId` INTEGER NOT NULL,
    `tourType` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tour_vehicleId_key`(`vehicleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location_In_Tour` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `locationId` INTEGER NOT NULL,
    `tourId` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `duration` VARCHAR(191) NULL,
    `description` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Location_In_Tour_locationId_key`(`locationId`),
    UNIQUE INDEX `Location_In_Tour_tourId_key`(`tourId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tour_Guide` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tour_Guide_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trip` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tourGuideId` INTEGER NOT NULL,
    `tourId` INTEGER NOT NULL,
    `totalCustomer` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Trip_tourGuideId_key`(`tourGuideId`),
    UNIQUE INDEX `Trip_tourId_key`(`tourId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment_Method` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paymentType` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paymentDate` DATETIME(3) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` BOOLEAN NOT NULL,
    `refunded` BOOLEAN NOT NULL,
    `refundedTime` DATETIME(3) NULL,
    `refundedAmount` DATETIME(3) NULL,
    `paymentMethodId` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NOT NULL,
    `bookingId` INTEGER NOT NULL,

    UNIQUE INDEX `Payment_paymentMethodId_key`(`paymentMethodId`),
    UNIQUE INDEX `Payment_bookingId_key`(`bookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingDate` DATETIME(3) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `totalAmount` DOUBLE NOT NULL,
    `totalCustomer` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `tripId` INTEGER NOT NULL,

    UNIQUE INDEX `Booking_userId_key`(`userId`),
    UNIQUE INDEX `Booking_tripId_key`(`tripId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
