import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WaterModule } from './water/water.module';
@Module({
  imports: [WaterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
