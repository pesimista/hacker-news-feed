import { HttpModule, Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './schemas/article.schema';
import { TasksService } from './tasks/tasks.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, TasksService],
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
})
export class ArticleModule {}
