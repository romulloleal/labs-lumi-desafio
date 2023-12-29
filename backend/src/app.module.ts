import { Module } from '@nestjs/common';

import { InvoiceModule } from './invoice/invoice.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [InvoiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
