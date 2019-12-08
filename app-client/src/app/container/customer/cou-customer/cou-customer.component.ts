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
        this.handleCancel();
      });
    }
  }

}
