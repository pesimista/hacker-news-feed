import { HttpModule } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ArticleController } from '../article.controller';
import { ArticleService } from '../article.service';
import { Article } from '../schemas/article.schema';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let uut: TasksService; // unit under testing
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 5,
        }),
      ],
      controllers: [ArticleController],
      providers: [
        ArticleService,
        TasksService,
        {
          provide: getModelToken(Article.name),
          useValue: Model, // <-- Use the Model Class from Mongoose
        },
      ],
    }).compile();

    uut = module.get<TasksService>(TasksService);
    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(uut).toBeDefined();
  });

  describe('#handleUpdate', () => {
    it('should return true after updating the database', async () => {
      const value = true;
      jest.spyOn(service, 'updateDatabase').mockResolvedValue(value);

      const response = await uut.handleUpdate();

      expect(response).toBe(value);
    });

    it('should throw an error', async () => {
      try {
        // mimic an error
        const error = new Error('network error');
        jest.spyOn(service, 'updateDatabase').mockRejectedValue(error);

        await uut.handleUpdate();
      } catch (error) {
        expect(error.message).toBe('network error');
      }
    });
  });

  describe('#onModuleInit', () => {
    it('should return true', async () => {
      const value = true;
      jest.spyOn(service, 'updateDatabase').mockResolvedValue(value);

      const response = uut.onModuleInit();

      expect(response).toBe(value);
    });
  });
});
