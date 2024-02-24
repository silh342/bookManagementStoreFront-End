import { User } from 'src/app/auth/model/user';
import { Book } from './book';

export class Review {
  body: string;
  rating: number;
  reviewAuthor: User;
  reviewedBook: Book;

  constructor(body: string, rating: number);
  constructor(body: string, rating: number, user?: User, book?: Book) {
    this.body = body;
    this.rating = rating;
    this.reviewAuthor = user;
    this.reviewedBook = book;
  }
}
