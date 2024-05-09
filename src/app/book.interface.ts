//  Author: Evelyn Zepeda
//  Date: 4/21/24
//  Title: Exercise 5.2 Navigation and Layout
//  File: book.interface.ts

//Exports the book interface
export interface IBook {
  isbn: string;
  title: string;
  description: string;
  numOfPages: number;
  authors: Array<string>;
}
