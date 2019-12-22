import { NzMessageService } from 'ng-zorro-antd';
import { CustomerService } from './../../../service/customer/customer.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cou-customer',
  templateUrl: './cou-customer.component.html',
  styleUrls: ['./cou-customer.component.scss']
})
export class CouCustomerComponent implements OnInit {

  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  validateForm: FormGroup;
  dateFormat = 'YYYY/MM/DD';
  inputValue: string;
  options: string[] = [];

  constructor(
    private customerSV: CustomerService,
    private fb: FormBuilder,
    private message: NzMessageService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      phone: [null, Validators.required],
      identity_number: [null],
      identity_image: [null],
      address: [null],
    });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit(this.isVisible);
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status === 'VALID') {
      let client = this.validateForm.value;
      client = { ...this.dataEdit, ...client };
      this.customerSV.updateOrCreateCustomer(client).subscribe(r => {
        if (r && r.status == 1) {
          this.message.create('success', this.dataEdit && this.dataEdit.id ? 'Tạo khách hàng thành công!' : 'Cập nhạt thành công!');
          this.handleCancel();
        } else {
          this.message.create('error', r && r.message ? r.message : 'Đã có lổi xẩy ra. Vui lòng thử lại!');
        }
      });
    }
  }

}
