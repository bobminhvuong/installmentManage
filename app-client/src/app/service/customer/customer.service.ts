import { MainService } from './../main.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private mainSV: MainService) { }

  getAll(filter): Observable<any> {
    filter = JSON.stringify(filter);
    const url = this.mainSV.host();
    return this.http.get(url + '/user?filter=' + filter).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  deleteCustomer(id): Observable<any> {
    const url = this.mainSV.host();
    return this.http.delete(url + `/user/${id}`).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  createCustomer(user): Observable<any> {
    const url = this.mainSV.host();
    return this.http.post(url + '/user', user, this.mainSV.getHttpOptions()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  updateCustomer(user): Observable<any> {
    const url = this.mainSV.host();
    return this.http.put(url + '/user/' + user.id, user, this.mainSV.getHttpOptions()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getByIdCustomer(id): Observable<any> {
    const url = this.mainSV.host();
    return this.http.get(url + '/user/' + id).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getCurrentCustomer(): Observable<any> {
    const url = this.mainSV.host();
    return this.http.get(url + '/auth/currentUser', this.mainSV.getHttpOptions()).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
