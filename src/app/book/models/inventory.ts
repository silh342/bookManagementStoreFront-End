import { Book } from './book';

export class Inventory {
  public id: number;
  public quantity: number;
  public book: Book;

  constructor(id: number, quantity: number, book: Book) {
    this.id = id;
    this.quantity = quantity;
    this.book = book;
  }
}
