import { CreateArticleDto } from 'src/articles/dto/create-article.dto';
import { HackernewsResponseDto } from 'src/articles/dto/hackernews-response.dto';
import { ArticleDoc } from 'src/articles/schemas/article.schema';

export const responseMock: HackernewsResponseDto = {
  hits: [
    {
      created_at: '2021-07-02T23:49:40.000Z',
      title: null,
      url: null,
      author: 'jonbcamposAlto',
      points: null,
      story_text: null,
      comment_text:
        'Alto | Ride-Hailing | ridealto.com | Sr. Application Engineer (backend - NodeJS) | Dallas, Tx preferred, Full Remote | We are a ride-hail startup that recently raised a series B, growing quickly and looking for solid backend engineers. Should have 5+ years experience with NodeJS \u0026amp; Express, kubernetes a plus, POSTGRES, GCP preferred. check out: \u003ca href="https:\u0026#x2F;\u0026#x2F;www.linkedin.com\u0026#x2F;jobs\u0026#x2F;view\u0026#x2F;2582175615\u0026#x2F;" rel="nofollow"\u003ehttps:\u0026#x2F;\u0026#x2F;www.linkedin.com\u0026#x2F;jobs\u0026#x2F;view\u0026#x2F;2582175615\u0026#x2F;\u003c/a\u003e',
      num_comments: null,
      story_id: 27699704,
      story_title: 'Ask HN: Who is hiring? (July 2021)',
      story_url: null,
      parent_id: 27699704,
      created_at_i: 1625269780,
      objectID: '27718202',
    },
    {
      created_at: '2021-07-02T23:49:40.000Z',
      title: null,
      url: null,
      author: 'jonbcamposAlto',
      points: null,
      story_text: null,
      comment_text:
        'Alto | Ride-Hailing | ridealto.com | Sr. Application Engineer (backend - NodeJS) | Dallas, Tx preferred, Full Remote | We are a ride-hail startup that recently raised a series B, growing quickly and looking for solid backend engineers. Should have 5+ years experience with NodeJS &amp; Express, kubernetes a plus, POSTGRES, GCP preferred. check out: <a href="https:&#x2F;&#x2F;www.linkedin.com&#x2F;jobs&#x2F;view&#x2F;2582175615&#x2F;" rel="nofollow">https:&#x2F;&#x2F;www.linkedin.com&#x2F;jobs&#x2F;view&#x2F;2582175615&#x2F;</a>',
      num_comments: null,
      story_id: 27699704,
      story_title: 'Ask HN: Who is hiring? (July 2021)',
      story_url: null,
      parent_id: 27699704,
      created_at_i: 1625269780,
      objectID: '27718202',
    },
  ],
  nbHits: 20670,
  page: 0,
  nbPages: 50,
  hitsPerPage: 20,
  exhaustiveNbHits: true,
  query: 'nodejs',
  params:
    'advancedSyntax=true\u0026analytics=true\u0026analyticsTags=backend\u0026query=nodejs',
  processingTimeMS: 8,
};

export const articletDoc = (mock: CreateArticleDto): Partial<ArticleDoc> => ({
  created_at: mock.created_at,
  title: mock.title,
  author: mock.author,
  story_id: mock.story_id,
  story_title: mock.story_title,
  story_url: mock.story_url,
  objectID: mock.objectID,
  hidden: false,
});
