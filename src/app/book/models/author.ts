import { Book } from './book';

export class Author {
  public id: number;
  public fullName: string;
  public description: string;
  public books: Book[];

  constructor(id: number, name: string, description: string, books: Book[]) {
    this.id = id;
    this.fullName = name;
    this.description = description;
    this.books = books;
  }
}
