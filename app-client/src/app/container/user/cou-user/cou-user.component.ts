import { UserService } from './../../../service/user/user.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-cou-user',
  templateUrl: './cou-user.component.html',
  styleUrls: ['./cou-user.component.scss']
})
export class CouUserComponent implements OnInit {
  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  validateForm: FormGroup;
  dateFormat = 'YYYY/MM/DD';
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  fileList = [
    {
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ];
  previewImage: string | undefined = '';
  previewVisible = false;

  constructor(private userSV: UserService, private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      phoneNumber: [null, [Validators.required]],
      address: [null],
      dob: [null, [Validators.required]],
      note: [null],
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
      let user = this.validateForm.value;
      user = { ...this.dataEdit, ...user };

      delete user.checkPassword;
      if (this.dataEdit.id) {
        this.userSV.updateUser(user).subscribe(r => {
          this.handleCancel();
        });
      } else {
        this.userSV.createUser(user).subscribe(r => {
          this.handleCancel();
        });
      }
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

}
