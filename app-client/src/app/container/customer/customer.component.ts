import { environment } from './../../../environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomerService } from './../../service/customer/customer.service';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import * as moment from 'moment';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
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

  constructor(private modalService: NzModalService, private fb: FormBuilder, private customerSV: CustomerService) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      find: [''],
    });
    this.getAll(this.filterForm.value);
  }

  getAll(filter) {
    let val = {
      find: filter.find,
      offset: 0,
      limit: 50
    }

    this.customerSV.getAll(val).subscribe(res => {
      this.listOfData = res.data;
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
    this.getAll(this.filterForm.value);
  }

  filterData() {
    this.getAll(this.filterForm.value);
  }

  handlePreviewImg = (url) => {
    this.previewImage = environment.APICURRENTSERVE + '/' + url;
    this.previewVisible = true;
  };

  formatDate(date,fm){
    return moment(date).format('DD/MM/YYYY');
  }
}
