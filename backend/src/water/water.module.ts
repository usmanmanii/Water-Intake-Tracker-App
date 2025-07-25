import { Module } from '@nestjs/common';
import { WaterService } from './water.service';
import { WaterController } from './water.controller';
import { PrismaService } from '../prisma.service';
@Module({
  controllers: [WaterController],
  providers: [WaterService, PrismaService],
})
export class WaterModule {}
