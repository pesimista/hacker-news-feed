import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './articles/article.module';
import config from './config';

@Module({
  imports: [
    ArticleModule,
    MongooseModule.forRoot(config.mongoURI),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
