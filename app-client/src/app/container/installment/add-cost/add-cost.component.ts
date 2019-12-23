import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { InvoiceService } from './../../../service/invoice/invoice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

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
  dataSource: any;
  constructor(
    private fb: FormBuilder,
    private invSV: InvoiceService,
    private modalService: NzModalService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      price: [null, [Validators.required]],
      note: [new Date(), [Validators.required]]
    });

    if (this.dataEdit && this.dataEdit.id) {
      this.customer = {
        id: this.dataEdit.customer_id,
        name: this.dataEdit.customer_name,
        address: this.dataEdit.customer_address,
        identity_number: this.dataEdit.customer_identity_number,
        phone: this.dataEdit.customer_phone
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

}
