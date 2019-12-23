import { NzMessageService } from 'ng-zorro-antd';
import { CustomerService } from './../../../service/customer/customer.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

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
  API_IMG = '';
  avatar = [];

  constructor(
    private customerSV: CustomerService,
    private fb: FormBuilder,
    private message: NzMessageService) { }

  ngOnInit() {
    this.API_IMG = environment.APICURRENTSERVE;
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      phone: [null, Validators.required],
      identity_number: [null],
      address: [null],
    });
    if (this.dataEdit && this.dataEdit.identity_image && this.dataEdit.identity_image != '') {
      this.avatar = [{
        uid: 1,
        url: this.API_IMG + '/' + this.dataEdit.identity_image,
        name: 'Hình ảnh',
        response: {
          urlImage: this.API_IMG + '/' + this.dataEdit.identity_image
        }
      }]
    }
  }

  handleChangeImg(e) {
    if (this.avatar.length > 1) {
      this.avatar = [this.avatar[1]];
    }
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
      client.identity_image = this.avatar.length > 0 ? this.avatar[0].response.urlImage : '';

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
