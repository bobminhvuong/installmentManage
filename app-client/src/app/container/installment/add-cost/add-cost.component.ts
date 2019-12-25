import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { InvoiceService } from './../../../service/invoice/invoice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-add-cost',
  templateUrl: './add-cost.component.html',
  styleUrls: ['./add-cost.component.scss']
})
export class AddCostComponent implements OnInit {

  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  customer: any;
  validateForm: FormGroup;
  listOfData: [];
  isLoadCost = false;
  constructor(
    private fb: FormBuilder,
    private invSV: InvoiceService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      price: [null, [Validators.required]],
      note: [null, [Validators.required]]
    });

    if (this.dataEdit && this.dataEdit.id) {
      this.customer = {
        id: this.dataEdit.customer_id,
        name: this.dataEdit.customer_name,
        address: this.dataEdit.customer_address,
        identity_number: this.dataEdit.customer_identity_number,
        phone: this.dataEdit.customer_phone,
        created: this.dataEdit.created,
        loan_price: this.dataEdit.loan_price
      }
      this.getLsCost();
    }
  }

  getLsCost() {
    this.invSV.getCost(this.dataEdit.id).subscribe(r => {
      if (r && r.status == 1) {
        this.listOfData = r.data;
      }
    })
  }

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit(this.isVisible);
  }

  addCost() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      let cost = this.validateForm.value;
      cost.invoice_id = this.dataEdit.id;
      this.isLoadCost = true;

      this.invSV.addCost(cost).subscribe(r => {
        if (r && r.status == 1) {
          this.message.create('success', 'Tạo thành công!');
          this.getLsCost();
          this.validateForm.reset();
        } else {
          this.message.create('error', r && r.message ? r.message : 'Có lổi xẩy ra. Vui lòng thử lại sau!')
        }
        this.isLoadCost = false;
      })
    }
  }

  confirmDeleteCost(data) {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc xóa chi phí này?',
      nzOkText: 'Xác nhận',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteNote(data.id),
      nzCancelText: 'Hủy',
    });
  }

  deleteNote(id) {
    this.invSV.deleteCost(id).subscribe(r => {
      if (r && r.status == 1) {
        this.message.create('success', 'Xóa thành công!');
        this.getLsCost();
      } else {
        this.message.create('error', r && r.message ? r.message : 'Có lổi xẩy ra. Vui lòng thử lại sau!')
      }
    })
  }

  formatCurrency(val) {
    if (val && val != '') {
      val = Number((val + '').replace(/,/g, ""));
      return val.toLocaleString();
    } else return '';
  }

  formatDate(date, format) {
    return moment(date).format('DD/MM/YYYY');
  }
}
