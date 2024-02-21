import { Injectable } from '@angular/core';
import { Author } from '../models/author';
import { Category } from '../models/category';
import { AuthorService } from '../../author/services/author.service';
import { CategoryService } from '../services/category.service';
import { FormControl } from '@angular/forms';
import { forkJoin, map, startWith } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedDataService {
  authorOptions: string[];
  categoryOptions: string[];
  constructor(
    private authorService: AuthorService,
    private categoryService: CategoryService
  ) {}

  shareData() {
    return forkJoin({
      authors: this.authorService.getAllAuthors(),
      categories: this.categoryService.getAllCategories(),
    });
    /*.subscribe({
      next: ({ authors, categories }) => {
        this.authorOptions = authors.map((author) => author.fullName);
        this.categoryOptions = categories.map(
          (category) => category.categoryName
        );
      },
      error: (error) => {
        console.error('Error Fetching the Data from the back end', error);
      },
    });*/
  }

  fillAutocomplete(
    control: FormControl,
    sharedService: SharedDataService,
    type: 'author' | 'category'
  ) {
    return control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterControlOptions(value, sharedService, type))
    );
  }

  private _filterControlOptions(
    name: string,
    sharedService: SharedDataService,
    option: 'author' | 'category'
  ): string[] {
    const filterValue = name?.toLowerCase();
    return option === 'author'
      ? sharedService.authorOptions?.filter((option) =>
          option.toLowerCase().includes(filterValue)
        )
      : sharedService.categoryOptions?.filter((option) =>
          option.toLowerCase().includes(filterValue)
        );
  }
}
