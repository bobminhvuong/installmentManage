import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { InvoiceService } from './../../../service/invoice/invoice.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-itm-list',
  templateUrl: './interest-payment-history.component.html',
  styleUrls: ['./interest-payment-history.component.scss']
})
export class InterestPaymentHistoryComponent implements OnInit {

  isVisible = false;
  pageIndex = 1;
  pageSize = 50;
  total = 1;
  listOfData = [];
  loading = true;
  filterForm: FormGroup;
  dataEdit: any;
  lsStatus = [];
  isVisiblePay = false;
  isVisibleCost = false;
  isVisibleRate = false;

  constructor(
    private message: NzMessageService,
    private invSv: InvoiceService,
    private fb: FormBuilder,
    private modalService: NzModalService) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      find: [''],
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
      limit: this.pageSize
    }

    this.invSv.getAllPayHistory(filter).subscribe(res => {
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

  closeModalRate(val) {
    this.isVisibleRate = false;
    this.getAll(this.filterForm.value);
  }

  addRate(data) {
    this.dataEdit = data;
    this.isVisibleRate = true;
  }

  confirmDeleteRate(data) {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc xóa phần chia lãi này?',
      nzOkText: 'Xác nhận',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteRate(data.pay_id),
      nzCancelText: 'Hủy',
    });
  }

  deleteRate(pay_id) {
    this.invSv.deleteShareRate(pay_id).subscribe(r => {
      if (r && r.status == 1) {
        this.message.create('success', 'Xóa thành công!');
        this.getAll(this.filterForm.value);
      } else {
        this.message.create('error', r && r.message ? r.message : 'Có lỗi xẩy ra. Vui lòng thử lại!');
      }
    })
  }

  formatCurrency(val) {
    if (val && val != '') {
      val = Number((val + '').replace(/,/g, ""));
      return val.toLocaleString();
    } else return '';
  }

  formatDate(date, format) {
    return moment(date).format(format);
  }
}
