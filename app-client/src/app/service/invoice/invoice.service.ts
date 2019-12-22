import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MainService } from './../main.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient, private mainSV: MainService) { }

  getAll(filter): Observable<any> {
    filter.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/invoice/get', filter, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getDetail(inv_id): Observable<any> {
    let data = {
      api: this.mainSV.getApikey(),
      invoice_id: inv_id
    }
    return this.http.post(environment.APIHOST + '/api/invoice/detail', data, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getDataResource(): Observable<any> {
    return this.http.get(environment.APIHOST + '/api/invoice/getresource?api='+this.mainSV.getApikey(), this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  updateOrCreate(data): Observable<any> {
    data.api = this.mainSV.getApikey();
    data.user_id = data.id ? data.user_id: this.mainSV.getCurrentUser().id;
    return this.http.post(environment.APIHOST + '/api/invoice/add', data, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getStatus(): Observable<any> {
    return this.http.post(environment.APIHOST + '/api/invocie/getstatus?api='+this.mainSV.getApikey(), this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}