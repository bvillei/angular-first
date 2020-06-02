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

export class GetArticle {
  static readonly type = '[Article] Get';
  public lastError: any;
  constructor(public payload: string) { }
}

export class ResetArticle {
  static readonly type = '[Article] Reset';
  constructor() { }
}

