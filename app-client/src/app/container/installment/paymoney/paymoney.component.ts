import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { InvoiceService } from './../../../service/invoice/invoice.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
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
  pay: any;
  price: any;
  debit: any;
  dataPrice: any;
  constructor(private fb: FormBuilder,
    private invSV: InvoiceService, private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {
    this.debit = 0;
    this.validateForm = this.fb.group({
      date: [new Date()],
      price: [null, [Validators.required]],
      debit: [0],
      next_payday: [new Date(), [this.nextDateOke]],
      note: [null]
    });

    if (this.dataEdit && this.dataEdit.id) {
      this.customer = {
        id: this.dataEdit.customer_id,
        name: this.dataEdit.customer_name,
        address: this.dataEdit.customer_address,
        identity_number: this.dataEdit.customer_identity_number,
        phone: this.dataEdit.customer_phone,
        created: this.dataEdit.created,
        loan_price: this.dataEdit.loan_price,
        loan_date_start: this.dataEdit.loan_date_start
      }
      this.getInvoiceDetail();
    }

    this.getPrice();
  }

  nextDateOke = (control: FormControl): { [s: string]: boolean } => {
    if (this.validateForm && this.validateForm.controls) {
      if (control.value <= this.validateForm.controls.date.value) {
        return { confirm: true, error: true };
      }
      return {};
    }
    return {};
  };

  handlePrice() {
    let price = this.price;
    price = price && price != '' ? this.formatNumber(price) : 0;
    let dbit = this.formatCurrency((this.pay && this.pay.money && price <= this.pay.money) ? (this.pay.money - price) : 0);
    this.debit = dbit;
  }

  getPrice() {
    let data = {
      invoice_id: this.dataEdit.id,
      date: this.formatDate(this.validateForm.value.date, 'DD/MM/YYYY')
    };
    this.invSV.getCaculatePayPrice(data).subscribe(r => {
      if (r && r.status == 1) {
        this.price = this.formatCurrency(r.data.money);
        this.pay = r.data;
        this.handlePrice();
      } else {
        this.message.create('error', r && r.message ? r.message : 'Đã có lổi xẩy ra. Vui lòng thử lại!');
      }
    })
  }

  getInvoiceDetail() {
    this.invSV.getDetail(this.dataEdit.id).subscribe(r => {
      if (r && r.status == 1) {
        this.dataSource = r.data;
        let date = this.dataSource.pay[this.dataSource.pay.length -1].next_payday;
        this.validateForm.patchValue({date: date})
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

  formatCurrency(val) {
      if (val && val != '') {
        // let val = Number((value + '').replace(/,/g, ""));
        // this.appFormatVNChange.next(val.toLocaleString());
        val = val+ '';
        val = val.replace(/,/g, "")
        val += '';
        let x = val.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? '.' + x[1] : '';
  
        var rgx = /(\d+)(\d{3})/;
  
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return(x1 + x2)
  
      } else {
        return 0;
      }
  }

  showConfirmPay(isSuccess): void {
    if (!isSuccess) {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.validateForm.valid && !isSuccess) {
      this.modalService.confirm({
        nzTitle: isSuccess ? '<i>Bạn muốn Đóng lãi và kết thúc hợp đồng này?</i>' : '<i>Bạn muốn Đóng lãi cho hợp đồng này?</i>',
        nzOnOk: () => this.payMoney(isSuccess)
      });
    }
    if (isSuccess) {
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
    pay.date = this.formatDate(pay.date, 'DD/MM/YYYY')
    pay.is_finish = isSuccess;
    pay.debit = (pay.debit && pay.debit != '') ? this.formatNumber(pay.debit) : 0;
    
    this.invSV.payAdd(pay).subscribe(r => {
      let res = (r && r.status == 1) ? this.message.create('success', 'Đóng lãi thành công!') : this.message.create('error', r && r.message ? r.message : 'Đã có lổi xẩy ra. Vui lòng thử lại!');
      this.getInvoiceDetail();
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

  changeInputPrice(e) {
    if (this.price != '') {
      let val = Number((this.price + '').replace(/,/g, ""));
      this.price = '';
      if (!isNaN(val)) this.price = val.toLocaleString();
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  setBaddebt() {
    this.modalService.confirm({
      nzTitle: 'Thêm hợp đồng vào nợ xấu?',
      nzOkText: 'Xác nhận',
      nzOkType: 'danger',
      nzOnOk: () => this.changeStatusContact(4),
      nzCancelText: 'Hủy',
    });
  }

  changeStatusContact(status) {
    let data = {
      status_id: status,
      invoice_id: this.dataEdit.id
    }
    this.invSV.changeStatus(data).subscribe(r => {
      if (r && r.status == 1) {
        this.message.create('success', 'Cập nhật hợp đồng thành công!');
      } else {
        this.message.create('error', r && r.message ? r.message : 'Đã có lổi xẩy ra. Vui lòng thử lại');
      }
    })
  }

}
