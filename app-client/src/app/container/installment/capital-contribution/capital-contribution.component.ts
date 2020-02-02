import { ReportService } from './../../../service/report/report.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-capital-contribution',
  templateUrl: './capital-contribution.component.html',
  styleUrls: ['./capital-contribution.component.scss']
})
export class CapitalContributionComponent implements OnInit {

  capitals: any;
  loading = true;
  isVisibleCap = false;
  dataEdit: any;
  date = null;

  constructor(private reportSV: ReportService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    let val = {
      from: this.date && this.date[0] ?  moment(this.date[0]).format('DD/MM/YYYY') : '',
      to: this.date && this.date[1] ? moment(this.date[1]).format('DD/MM/YYYY') : ''
    }
    
    this.reportSV.getReportCapital(val).subscribe(r => {
      if (r && r.status == 1) {
        this.capitals = r;
        this.loading = false;
      }
    })
  }

  viewDetailCapital(data) {
    this.isVisibleCap = true;
    this.dataEdit = data ? data : {};
  }
  closeModal(val) {
    this.isVisibleCap = false;
    this.getAll();
  }
}
