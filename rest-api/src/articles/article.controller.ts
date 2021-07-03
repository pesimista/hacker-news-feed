import { Controller, Get, Param, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './schemas/article.schema';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Article> {
    return this.articleService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.articleService.remove(id);
  }
}
