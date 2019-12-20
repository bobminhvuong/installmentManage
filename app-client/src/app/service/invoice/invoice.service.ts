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

  updateOrCreateCustomer(cus): Observable<any> {
    cus.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/customer/add', cus, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

}
