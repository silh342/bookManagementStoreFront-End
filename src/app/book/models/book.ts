import { User } from 'src/app/auth/model/user';
import { Author } from './author';
import { Category } from './category';
import { Inventory } from './inventory';
import { Review } from './review';

export class Book {
  public bookId: number;
  public title: string;
  public isbn: string;
  public price: number;
  public dateCreation: Date;
  public datePublication: Date;
  public author: Author;
  public category: Category;
  public inventory: Inventory;
  public views: number;
  public reviews: Review[];
  public likedByUsers: User[];

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
    this.bookId = id;
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
