import { BdsService } from './../../service/bds/bds.service';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bds',
  templateUrl: './bds.component.html',
  styleUrls: ['./bds.component.scss']
})
export class BdsComponent implements OnInit {

  isVisible = false;
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData = [];
  loading = true;
  dataEdit: any | null = null;
  filterForm: FormGroup;

  constructor(private modalService: NzModalService, private fb: FormBuilder, private bdsSV: BdsService) { }

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

    this.bdsSV.getAll(val).subscribe(res => {
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

}
