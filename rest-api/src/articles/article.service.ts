import { HttpService, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { take } from 'rxjs/operators';
import { CreateArticleDto } from './dto/create-article.dto';
import { HackernewsResponseDto } from './dto/hackernews-response.dto';
import { Article, ArticleDoc } from './schemas/article.schema';

@Injectable()
export class ArticleService {
  private readonly logger = new Logger(ArticleService.name);

  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDoc>,
    public httpService: HttpService,
  ) {}

  async findAll(): Promise<ArticleDoc[]> {
    return await this.articleModel.find().where({ hidden: false });
  }

  async findOne(id: string): Promise<ArticleDoc> {
    try {
      const item = await this.articleModel.findOne({ story_id: +id });
      if (!item) {
        throw new Error(`Theres no document with the given story_id: ${id}`);
      }
      return item;
    } catch (error) {
      this.logger.error(`Error on remove(): ${error}`);
      throw error;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const item = await this.findOne(id);
      await item.updateOne({ hidden: true });
      return true;
    } catch (error) {
      this.logger.error(`Error on remove(): ${error}`);
      throw error;
    }
  }

  async updateEntry(article: CreateArticleDto): Promise<ArticleDoc> {
    try {
      const sanitized = new CreateArticleDto(article);
      let item = await this.articleModel.findOne({
        story_id: sanitized.story_id,
      });

      if (item) {
        await item.updateOne(sanitized);
        return item;
      }
      item = await this.articleModel.create(sanitized);

      return item;
    } catch (error) {
      this.logger.error(`Error on updateEntry(): ${error}`);
      throw error;
    }
  }

  async updateDatabase(): Promise<boolean> {
    try {
      const url = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';
      const newFeed = await this.httpService
        .get<HackernewsResponseDto>(url)
        .pipe(take(1))
        .toPromise();
      const { hits: entries } = newFeed.data;

      for (const entry of entries) {
        await this.updateEntry(entry);
      }
      return true;
    } catch (error) {
      this.logger.error(`Error on updateDatabase(): ${error}`);
      return false;
    }
  }
}
