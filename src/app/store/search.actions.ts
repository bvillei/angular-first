import {Article} from '../models/article';

export class Search {
  static readonly type = '[Article] Search';
  constructor(public payload: any) { }
}

export class SearchComplete {
  static readonly type = '[Article] Search Complete';
  constructor(public payload: Article[]) { }
}

export class SearchError {
  static readonly type = '[Article] Search Error';
  constructor(public payload: string) { }
}
