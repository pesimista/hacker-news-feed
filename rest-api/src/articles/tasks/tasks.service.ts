import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArticleService } from '../article.service';

@Injectable()
export class TasksService implements OnModuleInit {
  private readonly logger = new Logger(TasksService.name);

  constructor(private articleService: ArticleService) {}

  onModuleInit(): boolean {
    this.handleUpdate();
    return true;
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleUpdate(): Promise<boolean> {
    try {
      this.logger.debug('updating database from hacker news');

      const res = await this.articleService.updateDatabase();
      return res;
    } catch (error) {
      this.logger.error(`Error in handleUpdate(): ${error}`);
      throw error;
    }
  }
}
