import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message'


@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.scss']
})
export class AddContractComponent implements OnInit {
  validateForm: FormGroup;
  constructor(private fb: FormBuilder,private message: NzMessageService) { 
    this.validateForm = this.fb.group({
      loan: [null, [Validators.required]],
      date: [null, [Validators.required]],
      datePay: [null, [Validators.required]],
      interest: [null, [Validators.required]],
      interestDate: [null, [Validators.required]],
      numPay: [null, [Validators.required]],
      asset_id: [null, [Validators.required]],
      asset_name: [null, [Validators.required]],
      asset_price: [null, [Validators.required]],
      bank_user: [null, [Validators.required]],
      back_id: [null, [Validators.required]],
      back_price: [null, [Validators.required]],
    });
    
  }

  ngOnInit() {

   
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
}
