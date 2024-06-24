-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paper" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" VARCHAR(2000),
    "applicationSphere" VARCHAR(1000),
    "picture" BYTEA,
    "categoryId" TEXT,

    CONSTRAINT "Paper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cargo" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(1000),
    "weight" INTEGER,
    "shortDescription" VARCHAR(500),
    "articleNumber" TEXT,
    "packageQuantity" INTEGER,
    "description" VARCHAR(2000),
    "price" DOUBLE PRECISION,
    "width" DOUBLE PRECISION,
    "density" DOUBLE PRECISION,
    "winding" DOUBLE PRECISION,
    "packagingType" TEXT,
    "paperId" TEXT,

    CONSTRAINT "Cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Picture" (
    "id" TEXT NOT NULL,
    "order" INTEGER,
    "picture" BYTEA,
    "cargoId" TEXT,
    "type" TEXT,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" VARCHAR(3000),
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pictureId" TEXT,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Paper" ADD CONSTRAINT "Paper_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Cargo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture"("id") ON DELETE SET NULL ON UPDATE CASCADE;
