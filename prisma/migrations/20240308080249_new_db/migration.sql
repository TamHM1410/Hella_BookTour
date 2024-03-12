-- CreateTable
CREATE TABLE `City` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cityName` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NULL,

    UNIQUE INDEX `City_cityName_key`(`cityName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cityId` INTEGER NOT NULL,
    `locationName` VARCHAR(191) NOT NULL,
    `locationAddress` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,

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
    `deleteAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoty_Of_POI` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NULL,

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
    `deleteAt` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vehicleName` ENUM('Car', 'Bus', 'Bike') NOT NULL,
    `status` BOOLEAN NOT NULL,
    `capacity` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tour` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tourName` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `price` DOUBLE NOT NULL,
    `vehicleTypeId` INTEGER NOT NULL,
    `tourType` ENUM('Adventure', 'Historical', 'Cultural', 'Nature', 'Food') NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location_In_Tour` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `locationId` INTEGER NOT NULL,
    `image` VARCHAR(191) NULL,
    `tourId` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `duration` VARCHAR(191) NULL,
    `description` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NULL,
    `startCity` VARCHAR(191) NOT NULL,
    `endCity` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tour_Guide` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `language` ENUM('English', 'Vietnamese', 'French', 'Italy', 'Japanese', 'Chinese', 'Thai') NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NULL,

    UNIQUE INDEX `Tour_Guide_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trip` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tourGuideId` VARCHAR(191) NULL,
    `tourId` INTEGER NOT NULL,
    `startDate` VARCHAR(191) NULL,
    `endDate` VARCHAR(191) NULL,
    `totalCustomer` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment_Method` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paymentType` ENUM('CreditCard', 'DebitCard', 'PayPal') NOT NULL,
    `bankDetails` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paymentName` VARCHAR(191) NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` BOOLEAN NOT NULL,
    `refunded` BOOLEAN NOT NULL,
    `refundedTime` DATETIME(3) NULL,
    `refundedAmount` DATETIME(3) NULL,
    `paymentMethodId` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NULL,
    `bookingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingDate` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `totalAmount` DOUBLE NOT NULL,
    `totalCustomer` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `tripId` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,
    `deleteAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
