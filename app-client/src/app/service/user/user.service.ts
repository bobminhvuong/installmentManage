import { MainService } from './../main.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private mainSV: MainService) { }

  getAll(active): Observable<any> {
    active = active ? active : 1;
    return this.http.get(environment.APIHOST + '/api/staff/get?api=' + this.mainSV.getApikey() + '&&active=' + active).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  deleteUser(id): Observable<any> {
    const url = this.mainSV.host();
    return this.http.delete(url + `/user/${id}`).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  createOrUpdateUser(user): Observable<any> {
    user.active = user.active ? 1 : 0;
    return this.http.post(environment.APIHOST + '/api/staff/register', user, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getByIdUser(id): Observable<any> {
    const url = this.mainSV.host();
    return this.http.get(url + '/user/' + id).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getCurrentUser(): Observable<any> {
    const url = this.mainSV.host();
    return this.http.get(url + '/auth/currentUser', this.mainSV.getHttpOptions()).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
