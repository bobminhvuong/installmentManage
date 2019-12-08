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

  constructor(private customerSV: CustomerService, private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      phoneNumber: [null, [Validators.required]],
      address: [null],
      dob: [null, [Validators.required]],
      gender: [null, [Validators.required]]
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
      if (this.dataEdit.id) {
        this.customerSV.updateCustomer(client).subscribe(r => {
          this.handleCancel();
        });
      } else {
        this.customerSV.createCustomer(client).subscribe(r => {
          this.handleCancel();
        });
      }
    }
  }

}
