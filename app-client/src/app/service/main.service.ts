import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { throwError } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private token = localStorage.getItem('token');
  private origin = '';
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.origin = this.document.location.origin;
  }

  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.token
      })
    };
    return httpOptions;
  }

  getCurrentUser() {
    let user = localStorage.getItem('x-key-x-u-log');
    return  user ? JSON.parse(user): {};
  }

  getApikey(){
    let user = JSON.parse(localStorage.getItem('x-key-x-u-log'));
    return user.api ? user.api : '';
  }

  getHttpOptionsNotToken() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }

  host() {
    return this.origin;
  }

  host1() {
    return 'http://localhost:3000/';
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error('An error occurred:', error);
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
