import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateWaterLogDto } from './dto/create-water.dto';

@Injectable()
export class WaterService {
  constructor(private prisma: PrismaService) {}

  upsertLog({ userId, date, intakeMl }: CreateWaterLogDto) {
    if (typeof intakeMl !== 'number' || isNaN(intakeMl)) {
      throw new Error('Invalid intakeMl value');
    }

    return this.prisma.waterLog.upsert({
      where: { userId_date: { userId, date } },
      update: { intakeMl },
      create: { userId, date, intakeMl },
    });
  }

  async getSummary(userId: string) {
    const rawData = (await this.prisma.$queryRawUnsafe(
      `SELECT
         date,
         SUM("intakeMl") AS "totalIntake",
         ROUND(SUM("intakeMl") * 100.0 / 2000, 2) AS "percentageOfGoal"
       FROM "WaterLog"
       WHERE "userId" = $1
         AND date >= TO_CHAR(NOW() - INTERVAL '6 days', 'YYYY-MM-DD')
       GROUP BY date
       ORDER BY date ASC`,
      userId,
    )) as {
      date: string;
      totalIntake: number;
      percentageOfGoal: number;
    }[];

    return rawData.map((item) => ({
      date: item.date,
      totalIntake: Number(item.totalIntake),
      percentageOfGoal: Number(item.percentageOfGoal),
    }));
  }
}
