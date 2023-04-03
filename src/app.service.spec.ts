import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('test endpoint /GET', async () => {
    const from = 'bitcoin';
    const to = 'rocket-pool';
    const amount = 10;

    const response = await service.get({ from, to, amount });

    expect(response.from).toBe(from);
    expect(response.to).toBe(to);
    expect(response.amount).toBe(amount);
    expect(typeof response.result).toBe('number');
  });
});
