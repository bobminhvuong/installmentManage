import { MainService } from './../main.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient, private mainSV: MainService) { }

  getReportDashboar(filter): Observable<any> {
    filter.api = this.mainSV.getApikey();
    return this.http.post(environment.APIHOST + '/api/report/dashboard', filter, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getReportCapital(val): Observable<any> {
    let userLog = this.mainSV.getCurrentUser();
    let filter = {
      from: val.from,
      to: val.to,
      api: this.mainSV.getApikey(),
      user_id: userLog.type == 'admin' ? 0 : userLog.id,
    };
    return this.http.post(environment.APIHOST + '/api/report/Capital', filter, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }

  getReportCapitalDetail(id): Observable<any> {
    let val = {
      api: this.mainSV.getApikey(),
      user_id: id
    };
    return this.http.post(environment.APIHOST + '/api/report/Capital_detail', val, this.mainSV.getHttpOptionsNotToken()).pipe(
      catchError(this.mainSV.handleError)
    );
  }
}
