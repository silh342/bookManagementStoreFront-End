import { Book } from './book';

export class Category {
  public id: number;
  public categoryName: string;
  public books: Book[];

  constructor(id: number, name: string, books: Book[]) {
    this.id = id;
    this.categoryName = name;
    this.books = books;
  }
}
