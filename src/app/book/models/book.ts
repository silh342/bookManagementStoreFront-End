import { Author } from './author';
import { Category } from './category';
import { Inventory } from './inventory';

export class Book {
  public id: number;
  public title: string;
  public isbn: string;
  public price: number;
  public dateCreation: Date;
  public datePublication: Date;
  public author: Author;
  public category: Category;
  public inventory: Inventory;

  constructor(
    id: number,
    title: string,
    isbn: string,
    price: number,
    dateCreation: Date,
    datePublication: Date,
    author: Author,
    category: Category,
    inventory: Inventory
  ) {
    this.id = id;
    this.title = title;
    this.isbn = isbn;
    this.price = price;
    this.dateCreation = dateCreation;
    this.datePublication = datePublication;
    this.author = author;
    this.category = category;
    this.inventory = inventory;
  }
}
