import { createReadStream } from 'fs';
import * as path from 'path';

import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { Invoice } from '@prisma/client';

import { PrismaService } from '~/prisma/prisma.service.service';
import { ChartType, DashboardDataType } from '~/types/DashboardDataType';

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: PrismaService) {}

  public async getInvoices(data: {
    customer_number?: string;
  }): Promise<Invoice[]> {
    const { customer_number } = data;
    return await this.prisma.invoice.findMany({
      where: {
        customer: {
          customer_number: customer_number?.length
            ? customer_number
            : undefined,
        },
      },
      include: { customer: true },
      orderBy: [{ reference_date: 'asc' }, { customer: { name: 'asc' } }],
    });
  }

  public async dashboardData(data: {
    customer_number?: string;
  }): Promise<DashboardDataType> {
    const { customer_number } = data;

    const consumo: ChartType[] = [];
    const compensada: ChartType[] = [];
    const totalGD: ChartType[] = [];
    const economia: ChartType[] = [];

    const invoices = await this.prisma.invoice.groupBy({
      by: ['reference_date', 'reference'],
      where: {
        customer: {
          customer_number: customer_number?.length
            ? customer_number
            : undefined,
        },
      },
      _sum: {
        ee_kwh: true,
        scee_kwh: true,
        gdi_kwh: true,
        ee_value: true,
        scee_value: true,
        cipm: true,
        gdi_value: true,
      },
      orderBy: { reference_date: 'asc' },
    });

    invoices.forEach((invoice) => {
      consumo.push({
        id: invoice.reference,
        value: invoice._sum.ee_kwh! + invoice._sum.scee_kwh!,
      });
      compensada.push({
        id: invoice.reference,
        value: invoice._sum.gdi_kwh!,
      });
      totalGD.push({
        id: invoice.reference,
        value:
          invoice._sum.ee_value! +
          invoice._sum.scee_value! +
          invoice._sum.cipm!,
      });
      economia.push({
        id: invoice.reference,
        value: invoice._sum.gdi_value!,
      });
    });

    return { consumo, compensada, totalGD, economia };
  }

  async downloadInvoice(id: string): Promise<StreamableFile> {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
    });

    if (!invoice) {
      throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
    }

    const file = createReadStream(
      path.resolve(__dirname, '..', '..', 'invoices', invoice.file),
    );

    return new StreamableFile(file);
  }
}
