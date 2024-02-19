import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from 'src/app/book/models/author';
import { AuthorService } from 'src/app/book/services/author.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditAuthorComponent } from '../edit-author/edit-author.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css'],
})
export class AuthorListComponent implements OnInit {
  headers: string[] = ['fullName', 'description', 'actions'];
  dataSource: MatTableDataSource<Author>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authorService: AuthorService,
    private matDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authorService.getAllAuthors().subscribe((authors) => {
      this.dataSource = new MatTableDataSource<Author>(authors);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialogEditAuthor(element: Author) {
    const editAuthorDialog = this.matDialog.open(EditAuthorComponent, {
      width: '400px',
      data: {
        title: 'Edit Author',
        author: element,
      },
    });

    editAuthorDialog.afterClosed().subscribe((res) => {
      if (res) this.router.navigate(['/authors']);
    });
  }
}
