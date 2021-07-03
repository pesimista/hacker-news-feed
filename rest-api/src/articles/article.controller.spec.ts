import { HttpModule } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from './schemas/article.schema';
import { TasksService } from './tasks/tasks.service';
import * as mocks from '../../test/mocks/articles.moks';

describe('ArticleController', () => {
  let uut: ArticleController;
  let service;

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

    uut = module.get<ArticleController>(ArticleController);
    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(uut).toBeDefined();
  });

  describe('#findAll', () => {
    it('should return an array', async () => {
      const docMocks = mocks.responseMock.hits.map(mocks.articletDoc);

      jest.spyOn(service, 'findAll').mockResolvedValue(docMocks);

      const response = await uut.findAll();

      expect(response.length).toBe(2);
    });
  });

  describe('#findOne', () => {
    it('should return a single item', async () => {
      const docMocks = mocks.articletDoc(mocks.responseMock.hits[0]);

      jest.spyOn(service, 'findOne').mockResolvedValue(docMocks);

      const response = await uut.findOne('somekey');

      expect(response).toHaveProperty('objectID');
      expect(response).toHaveProperty('created_at');
      expect(response).toHaveProperty('title');
      expect(response).toHaveProperty('story_url');
      expect(response).toHaveProperty('objectID');
    });
  });

  describe('#remove', () => {
    it('should return true after updating the database', async () => {
      const value = true;
      jest.spyOn(service, 'remove').mockResolvedValue(value);

      const response = await uut.remove('somehey');

      expect(response).toBe(value);
    });
  });
});
