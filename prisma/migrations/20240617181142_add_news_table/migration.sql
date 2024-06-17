-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" VARCHAR(3000),
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pictureId" TEXT,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture"("id") ON DELETE SET NULL ON UPDATE CASCADE;
