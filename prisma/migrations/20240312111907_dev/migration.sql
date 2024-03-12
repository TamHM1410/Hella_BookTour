/*
  Warnings:

  - You are about to drop the column `paymentMethodId` on the `payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `payment` DROP COLUMN `paymentMethodId`,
    MODIFY `refunded` BOOLEAN NULL;
