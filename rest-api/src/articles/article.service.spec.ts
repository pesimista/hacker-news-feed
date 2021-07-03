import { HttpModule, HttpService } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article, ArticleDoc } from './schemas/article.schema';
import { TasksService } from './tasks/tasks.service';
import * as mocks from '../../test/mocks/articles.moks';
import { of, throwError } from 'rxjs';

describe('ArticleService', () => {
  let uut: ArticleService;
  let model: Model<ArticleDoc>;
  let http: HttpService;

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

    uut = module.get<ArticleService>(ArticleService);
    model = module.get<Model<ArticleDoc>>(getModelToken(Article.name));
    http = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(uut).toBeDefined();
  });

  describe('#findAll', () => {
    it('should return an array with two objects', async () => {
      const docMocks = mocks.responseMock.hits.map(mocks.articletDoc);
      jest.spyOn(model, 'find').mockReturnValue({
        where: jest.fn().mockResolvedValueOnce(docMocks),
      } as any);

      const response = await uut.findAll();
      const [first] = response;
      expect(response.length).toBe(2);
      expect(first).toHaveProperty('story_id');
    });
  });

  describe('#findOne', () => {
    it('should return only one object', async () => {
      const docMock = mocks.articletDoc(mocks.responseMock.hits[0]);

      jest.spyOn(model, 'findOne').mockResolvedValueOnce(docMock as ArticleDoc);

      const response = await uut.findOne('somekey');

      expect(response).toHaveProperty('story_id');
      expect(response).toHaveProperty('created_at');
      expect(response).toHaveProperty('title');
      expect(response).toHaveProperty('story_url');
      expect(response).toHaveProperty('objectID');
    });

    it('should throw and catch an error if theres no item with the given id', async () => {
      try {
        jest.spyOn(model, 'findOne').mockResolvedValueOnce(null);

        await uut.findOne('anotherkey');
        fail('unexpected result');
      } catch (error) {
        expect(error.message).toContain(
          'Theres no document with the given story_id:',
        );
      }
    });
  });

  describe('#remove', () => {
    it('should return true after setting the entry as hidden', async () => {
      const docMock = mocks.articletDoc(mocks.responseMock.hits[0]);
      docMock.hidden = true;
      docMock.updateOne = jest.fn().mockResolvedValueOnce(true);

      jest.spyOn(model, 'findOne').mockResolvedValue(docMock as ArticleDoc);

      const response = await uut.remove('somekey');

      expect(response).toBe(true);
    });

    it('should throw and catch an error', async () => {
      try {
        const docMock = mocks.articletDoc(mocks.responseMock.hits[0]);
        docMock.hidden = true;
        docMock.updateOne = jest
          .fn()
          .mockRejectedValueOnce(new Error('intended error'));

        jest.spyOn(model, 'findOne').mockResolvedValue(docMock as ArticleDoc);

        await uut.remove('somekey');
        fail('unexpected result');
      } catch (error) {
        expect(error.message).toBe('intended error');
      }
    });
  });

  describe('#updateEntry', () => {
    it('should throw and catch an error', async () => {
      try {
        const docMock = mocks.articletDoc(mocks.responseMock.hits[0]);
        docMock.hidden = true;
        docMock.updateOne = jest
          .fn()
          .mockRejectedValueOnce(new Error('intended error'));

        jest.spyOn(model, 'findOne').mockResolvedValue(docMock as ArticleDoc);

        await uut.updateEntry(null);
        fail('unexpected result');
      } catch (error) {
        expect(error.message).toContain('intended error');
      }
    });
  });

  describe('#updateDatabase', () => {
    it('should return after fetching and updatings the entries', async () => {
      const responseMock = {
        data: mocks.responseMock,
      } as any;

      const docMock = mocks.articletDoc(mocks.responseMock.hits[0]);
      const newDocMock = mocks.articletDoc(mocks.responseMock.hits[1]);
      docMock.hidden = true;
      docMock.updateOne = jest.fn().mockResolvedValueOnce(newDocMock);

      jest.spyOn(http, 'get').mockReturnValue(of(responseMock));
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(null);

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(newDocMock));
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(docMock as ArticleDoc);

      const response = await uut.updateDatabase();

      expect(response).toBe(true);
    });

    it('should return false if an error occurs', async () => {
      try {
        jest
          .spyOn(http, 'get')
          .mockReturnValue(throwError(new Error('intended error')));

        const res = await uut.updateDatabase();

        expect(res).toBe(false);
      } catch (error) {
        fail('unexpected result');
      }
    });
  });
});
