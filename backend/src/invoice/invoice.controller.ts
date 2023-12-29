import { Controller, Get, Param, Query, StreamableFile } from '@nestjs/common';
import { Invoice } from '@prisma/client';

import { DashboardDataType } from '~/types/DashboardDataType';

import { InvoiceService } from './invoice.service';

@Controller('/invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get('/')
  async invoices(
    @Query('customer_number') customer_number: string,
  ): Promise<Invoice[]> {
    return await this.invoiceService.getInvoices({ customer_number });
  }

  @Get('/dashboard')
  async dashboardData(
    @Query('customer_number') customer_number: string,
  ): Promise<DashboardDataType> {
    return await this.invoiceService.dashboardData({ customer_number });
  }

  @Get('/downloadInvoice/:id')
  async downloadInvoice(@Param('id') id: string): Promise<StreamableFile> {
    return await this.invoiceService.downloadInvoice(id);
  }
}
