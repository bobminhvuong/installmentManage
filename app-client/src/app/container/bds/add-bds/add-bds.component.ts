import { BdsService } from './../../../service/bds/bds.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-bds',
  templateUrl: './add-bds.component.html',
  styleUrls: ['./add-bds.component.scss']
})
export class AddBdsComponent implements OnInit {
  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  validateForm: FormGroup;
  dateFormat = 'YYYY/MM/DD';

  constructor(private fb: FormBuilder,private bdsSV: BdsService) { }

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
      let bds = this.validateForm.value;
      bds = { ...this.dataEdit, ...bds };
      this.bdsSV.updateOrCreate(bds).subscribe(r => {
        this.handleCancel();
      });
    }
  }

}
