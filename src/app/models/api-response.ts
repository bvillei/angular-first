import {Article} from './article';

export interface ApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
