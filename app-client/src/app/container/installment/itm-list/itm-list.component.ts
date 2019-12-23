import { InvoiceService } from './../../../service/invoice/invoice.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-itm-list',
  templateUrl: './itm-list.component.html',
  styleUrls: ['./itm-list.component.scss']
})
export class ItmListComponent implements OnInit {

  isVisible = false;
  pageIndex = 1;
  pageSize = 20;
  total = 1;
  listOfData = [];
  loading = true;
  filterForm: FormGroup;
  dataEdit: any;
  lsStatus = [];
  isVisiblePay = false;
  isVisibleCost = false;

  constructor(private invSv: InvoiceService, private fb: FormBuilder) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      date: [null],
      find: [''],
      active: [1]
    });

    this.getAll(this.filterForm.value);
    this.getStatus();
  }

  getStatus() {
    this.invSv.getStatus().subscribe(r => {
      if (r.status == 1) {
        this.lsStatus = r.data;
        console.log(this.lsStatus);

      }
    })
  }

  getAll(valFilter) {
    let filter = {
      offset: (this.pageIndex - 1) * this.pageSize,
      limit: this.pageSize,
      from: valFilter.date && valFilter.date[0] ? moment(valFilter.date[0]).format('DD/MM/YYYY') : '',
      to: valFilter.date && valFilter.date[1] ? moment(valFilter.date[1]).format('DD/MM/YYYY') : '',
      active: valFilter.active,
      find: valFilter.find
    }

    this.invSv.getAll(filter).subscribe(res => {
      this.listOfData = res.data;
      this.loading = false;
      this.total = res.total;
    });
  }

  filterData(): void {
    this.getAll(this.filterForm.value);
  }

  handleCorU(client) {
    this.dataEdit = client ? client : {};
    this.isVisible = true;
  }

  closeModal(e) {
    this.isVisible = e;
    this.getAll(this.filterForm.value);
  }

  panigate() {
    this.getAll(this.filterForm.value);
  }

  payContact(data) {
    this.isVisiblePay = true;
    this.dataEdit = data;
  }
  closeModalPay(val) {
    this.isVisiblePay = false;
  }

  closeModalCost(val) {
    this.isVisibleCost = false;
  }

  addCost(val) {
    this.dataEdit = val;
    this.isVisibleCost = true;
  }
}
