import { ReportService } from './../../../service/report/report.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private reportSV: ReportService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.reportSV.getReportCapital().subscribe(r => {
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
  closeModal(val){
    this.isVisibleCap = false;
    this.getAll();
  }
}
