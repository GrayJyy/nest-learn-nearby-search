import { Test, TestingModule } from '@nestjs/testing';
import { NearbyService } from './nearby.service';

describe('NearbyService', () => {
  let service: NearbyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NearbyService],
    }).compile();

    service = module.get<NearbyService>(NearbyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
