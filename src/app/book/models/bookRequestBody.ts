import { Book } from './book';

export interface BookRequestBody {
  book: Book;
  quantity: number;
  authorName: string;
  categoryName: string;
}
