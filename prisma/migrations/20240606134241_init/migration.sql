-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Paper` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `description` VARCHAR(2000) NULL,
    `applicationSphere` VARCHAR(1000) NULL,
    `picture` LONGBLOB NULL,
    `categoryId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cargo` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(1000) NULL,
    `weight` INTEGER NULL,
    `shortDescription` VARCHAR(500) NULL,
    `articleNumber` VARCHAR(191) NULL,
    `packageQuantity` INTEGER NULL,
    `description` VARCHAR(2000) NULL,
    `price` DOUBLE NULL,
    `width` DOUBLE NULL,
    `density` DOUBLE NULL,
    `winding` DOUBLE NULL,
    `packagingType` VARCHAR(191) NULL,
    `paperId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Picture` (
    `id` VARCHAR(191) NOT NULL,
    `order` INTEGER NULL,
    `picture` LONGBLOB NULL,
    `cargoId` VARCHAR(191) NULL,
    `type` ENUM('MAIN', 'TEXTURE', 'OTHER') NOT NULL DEFAULT 'OTHER',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Paper` ADD CONSTRAINT `Paper_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cargo` ADD CONSTRAINT `Cargo_paperId_fkey` FOREIGN KEY (`paperId`) REFERENCES `Paper`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_cargoId_fkey` FOREIGN KEY (`cargoId`) REFERENCES `Cargo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
