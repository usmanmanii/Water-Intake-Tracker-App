import { Test, TestingModule } from '@nestjs/testing';
import { WaterService } from './water.service';
import { PrismaService } from '../prisma.service';

describe('WaterService', () => {
  let service: WaterService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterService, PrismaService],
    }).compile();

    service = module.get<WaterService>(WaterService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upsert a water log', async () => {
    const upsertMock = jest.spyOn(prisma.waterLog, 'upsert').mockResolvedValue({
      id: 1,
      userId: 'user1',
      date: '2024-01-01',
      intakeMl: 1500,
      createdAt: new Date(),
    });
    const result = await service.upsertLog({ userId: 'user1', date: '2024-01-01', intakeMl: 1500 });
    expect(upsertMock).toHaveBeenCalledWith({
      where: { userId_date: { userId: 'user1', date: '2024-01-01' } },
      update: { intakeMl: 1500 },
      create: { userId: 'user1', date: '2024-01-01', intakeMl: 1500 },
    });
    expect(result).toHaveProperty('userId', 'user1');
    upsertMock.mockRestore();
  });
});
