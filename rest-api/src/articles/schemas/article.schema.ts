import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDoc = Article & Document;

@Schema()
export class Article {
  // @Prop() _id: string;
  @Prop() created_at: string;
  @Prop() title: string;
  @Prop() author: string;
  @Prop() story_id: number;
  @Prop() story_title: string;
  @Prop() story_url: string;
  @Prop() objectID: string;
  @Prop({ default: false }) hidden: boolean;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
