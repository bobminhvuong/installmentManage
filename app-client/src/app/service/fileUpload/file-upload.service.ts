import { catchError } from 'rxjs/operators';
import { MainService } from './../main.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient, private mainSV: MainService) { }

  uploadImage(file, path): Observable<any> {
    return this.http.post(environment.APICURRENTSERVE + '/api/fileUpload?pathImg=' + path, file).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
