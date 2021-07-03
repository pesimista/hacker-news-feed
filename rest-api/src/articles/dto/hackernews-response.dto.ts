import { CreateArticleDto } from './create-article.dto';

export class HackernewsResponseDto {
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  query: string;
  params: string;
  processingTimeMS: number;
  hits: CreateArticleDto[];
}
