import { ReportService } from './../../../service/report/report.service';
import { CustomerService } from './../../../service/customer/customer.service';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import * as moment from 'moment';

@Component({
  selector: 'app-interest-report',
  templateUrl: './interest-report.component.html',
  styleUrls: ['./interest-report.component.scss']
})
export class InterestReportComponent implements OnInit {
  isVisible = false;
  pageIndex = 1;
  pageSize = 20;
  total = 1;
  listOfData = [];
  loading = true;
  dataEdit: any | null = null;
  filterForm: FormGroup;
  previewImage: string | undefined = '';
  previewVisible = false;
  date = new Date();
  firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  filter={
    from: '',
    to: '',
    date:[this.firstDay,this.lastDay]
  };
  dataReport: any;

  constructor(private modalService: NzModalService, private fb: FormBuilder, private customerSV: CustomerService,private reportSV: ReportService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {

    this.filter.from = moment(this.filter.date[0]).format('DD/MM/YYYY');
    this.filter.to =  moment(this.filter.date[1]).format('DD/MM/YYYY');
    this.loading = true;
    this.reportSV.getReportInterest(this.filter).subscribe(res => {
      this.dataReport = res.data;
      this.listOfData = res.data.data;
      this.loading = false;
      this.total = res.count;
    });
  }

  handleCorU(client) {
    this.dataEdit = client ? client : {};
    this.isVisible = true;
  }

  closeModal(e) {
    this.isVisible = e;
    this.getAll();
  }

  filterData() {
    this.getAll();
  }


  formatDate(date,fm){
    return moment(date).format('DD/MM/YYYY');
  }
}
