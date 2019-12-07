import { catchError } from 'rxjs/operators';
import { MainService } from './../main.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient, private mainSV: MainService) { }

  insertImage(file): Observable<any> {
    const url = this.mainSV.host();
    return this.http.post(url + '/fileUpload/image', file).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
