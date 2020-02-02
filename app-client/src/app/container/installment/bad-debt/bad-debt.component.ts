import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { InvoiceService } from './../../../service/invoice/invoice.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-bad-debt',
  templateUrl: './bad-debt.component.html',
  styleUrls: ['./bad-debt.component.scss']
})
export class BadDebtComponent implements OnInit {

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
  constructor(private invSv: InvoiceService, private modalService: NzModalService, private message: NzMessageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      date: [null],
      find: [''],
      active: [1],
      status_id: [0],
      is_over: [null]
    });

    this.getAll(this.filterForm.value);
    this.getStatus();
  }

  getStatus() {
    this.invSv.getStatus().subscribe(r => {
      if (r.status == 1) {
        this.lsStatus = r.data;
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
      status_id: valFilter.status_id,
      find: valFilter.find,
      is_over: valFilter.is_over ? valFilter.is_over : 0
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



  formatCurrency(val) {
    if (val && val != '') {
      val = Number((val + '').replace(/,/g, ""));
      return val.toLocaleString();
    } else return '';
  }

  setBadDebt(data) {
    this.modalService.confirm({
      nzTitle: 'Thêm hợp đồng vào nợ xấu?',
      nzOkText: 'Xác nhận',
      nzOkType: 'danger',
      nzOnOk: () => this.changeStatusContact(4, data.id),
      nzCancelText: 'Hủy',
    });
  }

  cancelContact(data){
    this.modalService.confirm({
      nzTitle: 'Bạn muốn hủy hợp đồng này?',
      nzOkText: 'Xác nhận',
      nzOkType: 'danger',
      nzOnOk: () => this.changeStatusContact(2, data.id),
      nzCancelText: 'Hủy',
    });
  }

  changeStatusContact(status, id_iv) {
    let data = {
      status_id: status,
      invoice_id: id_iv
    }
    this.invSv.changeStatus(data).subscribe(r => {
      if (r && r.status == 1) {
        this.message.create('success', 'Cập nhật hợp đồng thành công!');
        this.getAll(this.filterForm.value);
      } else {
        this.message.create('error', r && r.message ? r.message : 'Đã có lổi xẩy ra. Vui lòng thử lại');
      }
    })
  }
}
