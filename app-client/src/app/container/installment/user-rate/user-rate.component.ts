import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { InvoiceService } from './../../../service/invoice/invoice.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-user-rate',
  templateUrl: './user-rate.component.html',
  styleUrls: ['./user-rate.component.scss']
})
export class UserRateComponent implements OnInit {
  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  dataSource: any;
  shareRates = [];
  constructor(
    private invSV: InvoiceService,
    private modalService: NzModalService,
    private message: NzMessageService) { }

  ngOnInit() {
    if (this.dataEdit) {
      this.shareRate(false);
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit(this.isVisible);
  }

  formatDate(date, format) {
    return moment(date).format(format);
  }

  formatCurrency(price) {
    return !price ? '' : Number(price + '').toLocaleString();
  }

  formatNumber(value) {
    if (value && value != '') {
      return Number((value + '').replace(/,/g, ""));
    } else {
      return 0;
    }
  }

  shareRate(isAdd) {
    let data = {
      invoice_pay_id: this.dataEdit.pay_id,
      is_add: isAdd
    }
    this.invSV.shareRate(data).subscribe(r => {
      if (r && r.status == 1) {
        this.shareRates = r.data;
        if (isAdd){
          this.handleCancel();
          this.message.create('success', 'Chia lãi thành công!');
        } 
      } else this.message.create('error', r && r.message ? r.message : 'Có lỗi xẩy ra. Vui lòng thử lại!')
    })
  }
}
