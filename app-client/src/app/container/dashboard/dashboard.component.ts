import { ReportService } from './../../service/report/report.service';
import { Component, OnInit } from '@angular/core';
import { endOfMonth,subDays, startOfMonth, subMonths, endOfYear, startOfYear, subYears } from 'date-fns';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = true;
  dataReport : any;
  dateSort: [null,null];
  ranges1 = { 
              'Hôm nay': [new Date(), new Date()], 
              'Hôm qua': [subDays(new Date(),1), subDays(new Date(),1)], 
              'Tháng này': [ startOfMonth(new Date()), endOfMonth(new Date())], 
              '7 ngày trước': [subDays(new Date(),7), endOfMonth(new Date())],
              '30 ngày trước': [subDays(new Date(),30),new Date()],
              'Tháng trước': [startOfMonth(subMonths(new Date(),1)), endOfMonth(subMonths(new Date(),1))],
              '2 tháng trước': [startOfMonth(subMonths(new Date(),2)), endOfMonth(subMonths(new Date(),1))],
              '3 tháng trước': [startOfMonth(subMonths(new Date(),3)), endOfMonth(subMonths(new Date(),1))],
              '6 tháng trước': [startOfMonth(subMonths(new Date(),3)), endOfMonth(subMonths(new Date(),1))],
              'Năm nay': [startOfYear(new Date()), endOfYear(new Date())],
              'Năm ngoái': [startOfYear(subYears(new Date(),1)), endOfYear(subYears(new Date(),1))],
             };

  constructor(private reportSv: ReportService) { }

  ngOnInit() {
    this.getReport();
  }

  getReport() {
    this.loading = true;
    let filter = {
      from: this.dateSort && this.dateSort[0] ? moment(this.dateSort[0]).format('DD/MM/YYYY') : '',
      to: this.dateSort && this.dateSort[1] ? moment(this.dateSort[1]).format('DD/MM/YYYY') : ''
    };

    this.reportSv.getReportDashboar(filter).subscribe(r => {
      if (r && r.status == 1) {
        this.dataReport = r.data;
        this.loading = false;
      }
    })
  }
}
