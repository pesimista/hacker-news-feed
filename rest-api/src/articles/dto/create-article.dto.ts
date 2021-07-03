export class CreateArticleDto {
  readonly created_at: string;
  readonly title: string;
  readonly url: string;
  readonly author: string;
  readonly points: string;
  readonly story_text: string;
  readonly comment_text: string;
  readonly num_comments: string;
  readonly story_id: number;
  readonly story_title: string;
  readonly story_url: string;
  readonly parent_id: number;
  readonly created_at_i: number;
  readonly objectID: string;

  constructor(args) {
    if (!args) {
      args = {};
    }

    this.created_at = args.created_at;
    this.title = args.title;
    this.url = args.url;
    this.author = args.author;
    this.points = args.points;
    this.story_text = args.story_text;
    this.comment_text = args.comment_text;
    this.num_comments = args.num_comments;
    this.story_id = args.story_id;
    this.story_title = args.story_title;
    this.story_url = args.story_url;
    this.parent_id = args.parent_id;
    this.created_at_i = args.created_at_i;
    this.objectID = args.objectID?.toString();
  }
}
