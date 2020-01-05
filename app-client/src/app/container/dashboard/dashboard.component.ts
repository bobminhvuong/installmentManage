import { ReportService } from './../../service/report/report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = true;
  dataReport : any;
  constructor(private reportSv: ReportService) { }

  ngOnInit() {
    this.getReport();
  }

  getReport() {
    this.loading = true;
    let filter = {
      from: '',
      to: ''
    };

    this.reportSv.getReportDashboar(filter).subscribe(r => {
      if (r && r.status == 1) {
        this.dataReport = r.data;
        this.loading = false;
      }
    })
  }
}
