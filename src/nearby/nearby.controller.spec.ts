import { Test, TestingModule } from '@nestjs/testing';
import { NearbyController } from './nearby.controller';
import { NearbyService } from './nearby.service';

describe('NearbyController', () => {
  let controller: NearbyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NearbyController],
      providers: [NearbyService],
    }).compile();

    controller = module.get<NearbyController>(NearbyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
