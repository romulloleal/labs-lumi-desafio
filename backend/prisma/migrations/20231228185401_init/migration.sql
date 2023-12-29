-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "customer" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "customer_number" VARCHAR NOT NULL,
    "install_number" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "customer_id" UUID NOT NULL,
    "reference" TEXT NOT NULL,
    "reference_date" DATE NOT NULL,
    "due_date" DATE NOT NULL,
    "ee_kwh" DOUBLE PRECISION NOT NULL,
    "ee_value" DOUBLE PRECISION NOT NULL,
    "scee_kwh" DOUBLE PRECISION NOT NULL,
    "scee_value" DOUBLE PRECISION NOT NULL,
    "gdi_kwh" DOUBLE PRECISION NOT NULL,
    "gdi_value" DOUBLE PRECISION NOT NULL,
    "cipm" DOUBLE PRECISION NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "barcode" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_install_number_key" ON "customer"("install_number");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_barcode_key" ON "invoice"("barcode");

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
