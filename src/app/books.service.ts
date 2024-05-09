
//  Author: Evelyn Zepeda
//  Date: 5/9/24
//  Title: Exercise 5.3 - Data Tables
//  File: Assignment 8.2 Server-side

//Import statements
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class BooksService {

  isbns: Array<string> = [
    '0345339681',
    '0261103571',
    '9780593099322',
    '9780261102361',
    '9780261102378',
    '9780590302715',
    '9780316769532',
    '9780743273565',
    '9780590405959'
  ]

  constructor(private http: HttpClient) {}


  //To return the books inside the BooksService class
  getBooks() {
    let params = new HttpParams()

    params = params.append('bibkeys', `ISBN:${this.isbns.join(',')}`);
    params = params.append('format', 'json');
    params = params.append('jscmd', 'details');

    return this.http.get('https://openlibrary.org/api/books', {params: params})
  }


};
