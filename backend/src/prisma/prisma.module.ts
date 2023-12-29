import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PrismaService } from './prisma.service.service';

@Global()
@Module({
  providers: [PrismaClient, PrismaService],
  exports: [PrismaClient, PrismaService],
})
export class PrismaModule {}
