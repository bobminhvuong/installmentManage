import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MainService } from './../main.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient, private mainSV: MainService) { }

  getAll(filter): Observable<any> {
    // filter = JSON.stringify(filter);
    let data = {
      api: this.mainSV.getApikey(),
      find:'',
      offset: 0,
      limit: 50
    }
    return this.http.post(environment.APIHOST + '/api/invoice/asset/get', data,this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  updateOrCreateCustomer(cus): Observable<any> {
    cus.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/customer/add',cus, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

}
