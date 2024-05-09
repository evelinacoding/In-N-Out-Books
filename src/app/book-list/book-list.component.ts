//  Author: Evelyn Zepeda
//  Date: 4/26/24
//  Title: Assignment 5.4 - Dialogs
//  File: book-list.component.ts

//The import statements
import { Component, OnInit } from '@angular/core';
import { BooksService} from '../books.service'
import { IBook } from '../book.interface';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsDialogComponent } from '../book-details-dialog/book-details-dialog.component';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

//To export the BookList Component
export class BookListComponent implements OnInit {

  //Creating the variables
  books: Array<IBook> = [];
  book: IBook;

  constructor(private booksService: BooksService, private dialog: MatDialog) {
    this.booksService.getBooks().subscribe(res => {
      console.log(res);
      for(let key in res) {
        if (res.hasOwnProperty(key)) {
          let authors = [];
          if (res[key].details.authors) {
            authors = res[key].details.authors.map(function(author) {
              return author.name
            })
          }

        this.books.push({
          isbn: res[key].details.isbn_13 ? res[key].details.isbn_13 : res[key].details.isbn_10,
          title: res[key].details.title,
          description: res[key].details.subtitle ? res[key].details.subtitle : 'N/A',
          numOfPages: res[key].details.number_of_pages,
          authors: authors
          })
        }
      }
    })
  }

  ngOnInit(): void {}

  //Function to show book details
  showBookDetails(isbn: string) {
    this.book = this.books.find(book => book.isbn === isbn);

    //Creating the dialogRef variable
    const dialogRef = this.dialog.open(BookDetailsDialogComponent, {
      data: {
        book: this.book
      },

      disableClose: true,
      width: '800px'
    });

    console.log(this.book);

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'confirm') {
        this.book = null;
      }
    });
  }
}

