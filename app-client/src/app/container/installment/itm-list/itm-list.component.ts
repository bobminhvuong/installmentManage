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

  constructor(private invSv: InvoiceService, private fb: FormBuilder) { }

  ngOnInit() {
    let dateNow = new Date();
    this.filterForm = this.fb.group({
      date: [[
        dateNow.setMonth(dateNow.getMonth() - 1),
        new Date()
      ]],
      find: [''],
      active: [1]
    });

    this.getAll(this.filterForm.value);
  }

  getAll(valFilter) {
    let filter = {
      offset: 0,
      limit: 50,
      from: moment(valFilter.date[0]).format('DD/MM/YYYY'),
      to: moment(valFilter.date[1]).format('DD/MM/YYYY'),
      active: valFilter.active,
      find: valFilter.find
    }
    console.log(filter);
    
    this.invSv.getAll(filter).subscribe(res => {
      console.log(res);

      this.listOfData = res.data;
      this.loading = false;
      this.total = res.count;
    });
  }

  filterData(): void {
    this.getAll(this.filterForm.value);
  }

}
