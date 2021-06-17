import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppHttpResponseDto } from './dto/app-http-response.dto';
import { healthCheckMessage } from './common/constants/project-metadata';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getHealth', () => {
    it('should return a message.', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getHealth()).toBeInstanceOf(AppHttpResponseDto);
      expect(appController.getHealth().message).toBe(healthCheckMessage);
    });
  });
});
