import * as fs from 'fs';
import * as path from 'path';

import { PrismaClient } from '@prisma/client';
import { PDFExtract, PDFExtractText } from 'pdf.js-extract';

const pdfExtract = new PDFExtract();
const prisma = new PrismaClient();

// faz a varredura da pasta invoices buscando as faturas em pdf
(async () => {
  const files = fs.readdirSync(path.resolve(__dirname, '..', 'invoices'));
  files.forEach(async (file) => {
    try {
      const invoice = await pdfExtract
        .extract(path.resolve(__dirname, '..', 'invoices', file))
        .then((data) => data.pages[0].content);

      await parseInvoice(invoice, file);
    } catch (err) {
      console.log(err.message);
    }
  });
})();

// varre o arquivo pdf em busca dos dados
const parseInvoice = async (invoice: PDFExtractText[], file: string) => {
  const name = invoice?.find(
    (value) =>
      value.x === 17 && value.y === 61.64999999999998 && !!value.str.length,
  )?.str;
  const customer_number = invoice?.at(
    invoice?.map((value) => value.str).indexOf('Nº DO CLIENTE') + 4,
  )?.str;
  const install_number = invoice?.at(
    invoice?.map((value) => value.str).indexOf('Nº DA INSTALAÇÃO') + 4,
  )?.str;
  const reference = invoice?.at(
    invoice?.map((value) => value.str).indexOf('Referente a') + 6,
  )?.str;
  const due_date = invoice?.at(
    invoice?.map((value) => value.str).indexOf('Vencimento') + 8,
  )?.str;
  const ee_kwh = invoice
    ?.at(invoice?.map((value) => value.str).indexOf('Energia Elétrica') + 4)
    ?.str.replace('.', '');
  const ee_value = invoice
    ?.at(invoice?.map((value) => value.str).indexOf('Energia Elétrica') + 8)
    ?.str.replace(',', '.');
  const scee_kwh = invoice
    ?.at(invoice?.map((value) => value.str).indexOf('Energia SCEE s/ ICMS') + 4)
    ?.str.replace('.', '');
  const scee_value = invoice
    ?.at(invoice?.map((value) => value.str).indexOf('Energia SCEE s/ ICMS') + 8)
    ?.str.replace(',', '.');
  const gdi_kwh = invoice
    ?.at(
      invoice?.map((value) => value.str).indexOf('Energia compensada GD I') + 4,
    )
    ?.str.replace('.', '');
  const gdi_value = invoice
    ?.at(
      invoice?.map((value) => value.str).indexOf('Energia compensada GD I') + 8,
    )
    ?.str.replace(',', '.');
  const cipm = invoice
    ?.at(
      invoice
        ?.map((value) => value.str)
        .indexOf('Contrib Ilum Publica Municipal') + 2,
    )
    ?.str.replace(',', '.');
  const value = invoice
    ?.at(invoice?.map((value) => value.str).indexOf('Valor a pagar (R$)') + 6)
    ?.str.replace(',', '.');
  const barcode = invoice?.find(
    (value) => value.x === 263.6 && value.y === 777.45 && !!value.str.length,
  )?.str;
  if (
    !name?.length ||
    !customer_number?.length ||
    !install_number?.length ||
    !reference?.length ||
    !due_date?.length ||
    !ee_kwh?.length ||
    !ee_value?.length ||
    !scee_kwh?.length ||
    !scee_value?.length ||
    !gdi_kwh?.length ||
    !gdi_value?.length ||
    !cipm?.length ||
    !value?.length ||
    !barcode?.length
  )
    throw new Error('the pdf invoice is wrong or poorly formatted');

  const invoiceData = {
    reference: reference,
    reference_date: parseReferenceDate(reference),
    due_date: new Date(due_date.split('/').reverse().join('-')),
    ee_kwh: Number(ee_kwh),
    ee_value: Number(ee_value),
    scee_kwh: Number(scee_kwh),
    scee_value: Number(scee_value),
    gdi_kwh: Number(gdi_kwh),
    gdi_value: Number(gdi_value),
    cipm: Number(cipm),
    value: Number(value),
    barcode,
    file,
  };

  const customer = await prisma.customer.upsert({
    create: { name, customer_number, install_number },
    where: { install_number },
    update: { name },
  });

  await prisma.invoice.upsert({
    create: {
      ...invoiceData,
      customer: {
        connect: {
          id: customer.id,
        },
      },
    },
    where: {
      barcode: invoiceData.barcode,
    },
    update: {},
  });
};

const parseReferenceDate = (value: string): Date => {
  const months = [
    { name: 'JAN', value: '01' },
    { name: 'FEV', value: '02' },
    { name: 'MAR', value: '03' },
    { name: 'ABR', value: '04' },
    { name: 'MAI', value: '05' },
    { name: 'JUN', value: '06' },
    { name: 'JUL', value: '07' },
    { name: 'AGO', value: '08' },
    { name: 'SET', value: '09' },
    { name: 'OUT', value: '10' },
    { name: 'NOV', value: '11' },
    { name: 'DEZ', value: '12' },
  ];
  const [month, year] = value.split('/');
  return new Date(
    `${year}-${months.find((mo) => mo.name === month)?.value}-01`,
  );
};
