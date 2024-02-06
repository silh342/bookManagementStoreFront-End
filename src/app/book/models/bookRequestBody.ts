import { Book } from './book';

export interface BookRequestBody {
  book: Book;
  authorName: string;
  categoryName: string;
  quantity: number;
}
