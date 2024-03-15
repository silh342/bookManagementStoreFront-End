import { Injectable } from '@angular/core';
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
    const filterValue = name ? name?.toLowerCase() : '';
    return option === 'author'
      ? sharedService.authorOptions?.filter((option) =>
          option.toLowerCase().includes(filterValue)
        )
      : sharedService.categoryOptions?.filter((option) =>
          option.toLowerCase().includes(filterValue)
        );
  }
}
