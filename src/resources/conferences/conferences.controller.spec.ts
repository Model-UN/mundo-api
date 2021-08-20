import { Test, TestingModule } from '@nestjs/testing';
import { ConferencesController } from './conferences.controller';
import { ConferencesService } from './conferences.service';

describe('ConferencesController', () => {
  let controller: ConferencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConferencesController],
      providers: [ConferencesService],
    }).compile();

    controller = module.get<ConferencesController>(ConferencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
