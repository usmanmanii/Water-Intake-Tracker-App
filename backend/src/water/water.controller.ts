import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { WaterService } from './water.service';
import { CreateWaterLogDto } from './dto/create-water.dto';
@Controller()
export class WaterController {
  constructor(private readonly waterService: WaterService) {}
  @Post('water-log')
  async logWater(@Body() body: CreateWaterLogDto) {
    return this.waterService.upsertLog(body);
  }
  @Get('water-summary/:userId')
  async getSummary(@Param('userId') userId: string) {
    return this.waterService.getSummary(userId);
  }
}
