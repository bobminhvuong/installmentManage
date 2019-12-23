import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { InvoiceService } from './../../../service/invoice/invoice.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-paymoney',
  templateUrl: './paymoney.component.html',
  styleUrls: ['./paymoney.component.scss']
})
export class PaymoneyComponent implements OnInit {
  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  customer: any;
  validateForm: FormGroup;
  dataSource: any;
  constructor(private fb: FormBuilder,
    private invSV: InvoiceService, private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      price: [null, [Validators.required]],
      next_payday: [new Date()]
    });

    if (this.dataEdit && this.dataEdit.id) {
      this.customer = {
        id: this.dataEdit.customer_id,
        name: this.dataEdit.customer_name,
        address: this.dataEdit.customer_address,
        identity_number: this.dataEdit.customer_identity_number,
        phone: this.dataEdit.customer_phone,
        created: this.dataEdit.created
      }
      this.getInvoiceDetail();
    }

  }

  getInvoiceDetail() {
    this.invSV.getDetail(this.dataEdit.id).subscribe(r => {
      if (r && r.status == 1) {
        this.dataSource = r.data;
      }
    })
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

  showConfirmPay(isSuccess): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.modalService.confirm({
        nzTitle: isSuccess ? '<i>Bạn muốn Đóng lãi và kết thúc hợp đồng này?</i>' : '<i>Bạn muốn Đóng lãi cho hợp đồng này?</i>',
        nzOnOk: () => this.payMoney(isSuccess)
      });
    }
  }

  payMoney(isSuccess): void {
    let pay = this.validateForm.value;
    pay.invoice_id = this.dataEdit.id;
    pay.next_payday = this.formatDate(pay.next_payday, 'DD/MM/YYYY');
    pay.price = this.formatNumber(pay.price);
    pay.is_finish = isSuccess;
    if(isSuccess) delete pay.next_payday;

    this.invSV.payAdd(pay).subscribe(r => {
      if (r && r.status == 1) {
        this.handleCancel();
        this.message.create('success', 'Đóng lãi thành công!');

      } else {
        this.message.create('error', r && r.message ? r.message : 'Đã có lổi xẩy ra. Vui lòng thử lại!');
      }

    })
  }
  confirmDeletePay(data) {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc xóa lần đóng lãi này?',
      nzOkText: 'Xác nhận',
      nzOkType: 'danger',
      nzOnOk: () => this.deletePay(data.id),
      nzCancelText: 'Hủy',
    });
  }

  deletePay(idPay) {
    this.invSV.deletePay(idPay).subscribe(r => {
      if (r && r.status == 1) {
        this.getInvoiceDetail();
        this.message.create('success', 'Xóa thành công!');
      } else {
        this.message.create('error', r && r.message ? r.message : 'Đã có lổi xẩy ra. Vui lòng thử lại');
      }
    })
  }

  formatNumber(value) {
    if (value && value != '') {
      return Number((value + '').replace(/,/g, ""));
    } else {
      return 0;
    }
  }

}
