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
    let userLog = this.mainSV.getCurrentUser();
    filter.api = this.mainSV.getApikey();
    filter.user_id_capital = userLog.type == 'admin' ? 0 : userLog.id;
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
    return this.http.get(environment.APIHOST + '/api/invoice/getresource?api=' + this.mainSV.getApikey(), this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  updateOrCreate(data): Observable<any> {
    data.api = this.mainSV.getApikey();
    data.user_id = data.id ? data.user_id : this.mainSV.getCurrentUser().id;
    return this.http.post(environment.APIHOST + '/api/invoice/add', data, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getStatus(): Observable<any> {
    return this.http.get(environment.APIHOST + '/api/invoice/getstatus?api=' + this.mainSV.getApikey(), this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  payAdd(data): Observable<any> {
    data.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/invoice/pay/add', data, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  deletePay(idPay): Observable<any> {
    let data = {
      id: idPay,
      api: this.mainSV.getApikey()
    }
    return this.http.post(environment.APIHOST + '/api/invoice/pay/delete', data, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  addCost(cost): Observable<any> {
    cost.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/invoice/cashbook/add', cost, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getCost(invoice_id): Observable<any> {
    let data = {
      invoice_id: invoice_id,
      api: this.mainSV.getApikey()
    }
    return this.http.post(environment.APIHOST + '/api/invoice/cashbook/get', data, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  deleteCost(id): Observable<any> {
    let data = {
      id: id,
      api: this.mainSV.getApikey()
    }
    return this.http.post(environment.APIHOST + '/api/invoice/cashbook/delete', data, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  shareRate(data): Observable<any> {
    data.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/invoice/Profit/Get', data, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  deleteShareRate(invoice_pay_id): Observable<any> {
    let data = {
      invoice_pay_id: invoice_pay_id,
      api: this.mainSV.getApikey()
    }
    return this.http.post(environment.APIHOST + '/api/invoice/Profit/Delete', data, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getAllPayHistory(filter): Observable<any> {
    filter.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/invoice/Pay/History', filter, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getCaculatePayPrice(filter): Observable<any> {
    filter.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/invoice/pay/Calculate', filter, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  changeStatus(data): Observable<any> {
    data.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/invoice/changestatus', data, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
