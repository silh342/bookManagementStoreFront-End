import { Book } from './book';

export class Author {
  public authorId: number;
  public fullName: string;
  public description: string;
  public books: Book[];

  constructor(id: number, name: string, description: string, books: Book[]) {
    this.authorId = id;
    this.fullName = name;
    this.description = description;
    this.books = books;
  }
}
