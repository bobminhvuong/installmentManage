import { InvoiceService } from './../../../service/invoice/invoice.service';
import { CustomerService } from './../../../service/customer/customer.service';
import { UserService } from './../../../service/user/user.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message'
import { getNzAutocompleteMissingPanelError } from 'ng-zorro-antd';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.scss']
})
export class AddContractComponent implements OnInit {
  validateForm: FormGroup;
  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();

  inputUser: string;
  lsUser = [];
  listCustomers = [];
  customer: any;
  inputCustomer: string;
  dataSource: any;
  lsAssets = [];
  listImage = [];
  listCapital = [];
  images = [];
  dateFormat = 'dd/MM/yyyy';
  isVisibleUser = false;
  dataUser = {};
  loan_price = '';
  loan_rate = '';
  loan_type = 0;
  brokerage_amount = '0';
  capital_sources = [];
  API_IMG = '';

  formatterMoney = (value: number) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  parserMoney = (value: string) => value.replace(/\$\s?|(,*)/g, '');
  @ViewChild('inputElement', { static: false }) inputElement: ElementRef;
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private userSV: UserService,
    private customerSV: CustomerService,
    private invSV: InvoiceService
  ) {
  }

  ngOnInit() {
    let startDate = new Date();
    let endDate = new Date();
    this.API_IMG = environment.APICURRENTSERVE;
    if (this.dataEdit && this.dataEdit.id) {
      let dateStartArray = this.dataEdit.loan_date_start.split("/");
      let dateEndArray = this.dataEdit.loan_date_end.split("/");
      startDate = new Date(dateStartArray[1] + '/' + dateStartArray[0] + '/' + dateStartArray[2]);
      endDate = new Date(dateEndArray[1] + '/' + dateEndArray[0] + '/' + dateEndArray[2]);
    }
    this.loan_price = this.dataEdit.loan_price ? this.dataEdit.loan_price : '';
    this.loan_rate = this.dataEdit.loan_rate ? this.dataEdit.loan_rate : '';
    this.loan_type = this.dataEdit && this.dataEdit.loan_type ? this.dataEdit.loan_type : 0;
    this.brokerage_amount = this.dataEdit && this.dataEdit.brokerage_amount ? this.dataEdit.brokerage_amount + '' : '0';

    this.validateForm = this.fb.group({
      loan_price: [this.loan_price, [Validators.required]],
      loan_date_start: [startDate, [Validators.required]],
      loan_date_end: [endDate, [Validators.required]],
      loan_rate: [ this.loan_rate, [Validators.required]],
      customer_id: [this.dataEdit.customer_id ? this.dataEdit.customer_id : '', [Validators.required]],
      loan_type: [this.loan_type],
      brokerage_amount : [this.brokerage_amount],
      note: [this.dataEdit.note ? this.dataEdit.note : '']
    });
    
    this.getUser();
    this.getCustomers();
    this.getData();
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
        r.data.asset.forEach(e => {
          e.name = e.asset_source_name;
          e.id = e.asset_source_id;
          e.price = e.price;
        })

        r.data.capital.forEach(e => {
          e.id = e.user_id;
          e.name = e.user_name;
          e.price = e.price;
          // e.price = e.price;
        })
        r.data.image.forEach(function (e, i) {
          e.url = environment.APICURRENTSERVE + '/' + e.url;
          e.uid = e.id;
          e.name = 'Hình ảnh ' + (i + 1);
        })
        this.lsAssets = r.data.asset;
        this.listCapital = r.data.capital;
        this.images = r.data.image;
        this.capital_sources = r.data.capital_source;
      }
    })
  }

  getData() {
    this.invSV.getDataResource().subscribe(r => {
      this.dataSource = r;
    })
  }

  getCustomers() {
    let ft = {
      find: '',
      limit: 1000,
      offset: 0
    }
    this.customerSV.getAll(ft).subscribe(r => {
      if (r.status == 1) {
        this.listCustomers = r.data;
      }
    })
  }

  getUser() {
    this.userSV.getAll(1).subscribe(r => {
      if (r.status == 1) {
        this.lsUser = r.data;
      }
    })
  }

  checkCapital() {
    if (this.listCapital.length == 0) {
      this.message.create('error', 'Bạn chưa chọn nguồn vốn!');
      return false;
    } else {
      let us = this.listCapital.find(e => { return (!e.price || e.price === '') });
      if (us) {
        this.message.create('error', 'Số tiền vốn không được để trống!');
        return false;
      } else {
        let total = 0;
        this.listCapital.forEach(e => {
          total = total + this.formatNumber(e.price);
        })
        if (total !== this.formatNumber(this.validateForm.value.loan_price)) {
          this.message.create('error', 'Số tiền vốn không đủ!');
          return false;
        } else return true;
      }
    }
  }

  checkAsset() {
    if (this.lsAssets.length == 0) {
      this.message.create('error', 'Bạn chưa chọn tài sản cầm cố!')
      return false;
    } else {
      return true;
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid && this.checkAsset() && this.checkCapital()) {
      let capitals = [];
      this.listCapital.forEach(e => {
        capitals.push({
          user_id: e.id,
          price: Number(e.price.replace(/,/g, '')),
          money_source_id: e.money_source_id
        })
      })
      let assets = [];
      this.lsAssets.forEach(e => {
        assets.push({
          asset_source_id: e.id,
          price: Number(e.price.replace(/,/g, ''))
        })
      })

      let images = [];
      this.images.forEach(e => {
        if (e.id) images.push((e.url.replace(environment.APICURRENTSERVE + '/', '')))
        if ((e.response && e.response.status == 1)) images.push(e.response.urlImage);
      })

      let data = this.validateForm.value;
      data.loan_price = Number(data.loan_price.replace(/,/g, ''));
      data.loan_rate = Number(data.loan_rate.replace(/,/g, ''));
      data.brokerage_amount = Number(data.brokerage_amount.replace(/,/g, ''));
      data.capitals = capitals;
      data.loan_date_start = moment(data.loan_date_start).format('DD/MM/YYYY');
      data.loan_date_end = moment(data.loan_date_end).format('DD/MM/YYYY');
      data.images = images;
      data.assets = assets;
      data = { ...this.dataEdit, ...data };

      this.invSV.updateOrCreate(data).subscribe(r => {
        if (r && r.status == 1) {
          this.handleCancel();
          this.message.create('success', this.dataEdit && this.dataEdit.id ? 'Cập nhật hóa đơn thành công!' : 'Tạo hóa đơn thành công!');
        } else {
          this.message.create('error', r && r.message ? r.message : 'Đã có lổi xẩy ra. Vui lòng thử lại!');
        }
      })
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit(this.isVisible);
  }
  AddUser(id) {
    let us = this.lsUser.find(e => { return e.id == id });
    if (us && !this.listCapital.find(e => { return e.id == us.id })) {
      us.money_source_id = 1;
      this.listCapital.push(us);
    } else {
      this.message.create('error', 'Đã chọn người này!');
    }
  }
  AddAssets(id) {
    let as = this.dataSource.asset.find(e => { return e.id == id });
    if (as) {
      as.price = 0;
      this.lsAssets.push(as);
    }
  }

  AddCustomer(id) {
    let cus = this.listCustomers.find(e => { return e.id == id });
    this.customer = cus;
  }

  deleteUserCapital(index) {
    this.listCapital.splice(index, 1);
  }

  deleteAsset(index) {
    this.lsAssets.splice(index, 1)
  }

  addNewCustomer(): void {
    this.isVisibleUser = true;
  }

  closeModalUser(e) {
    this.isVisibleUser = false;
    this.getCustomers();
  }

  formatNumber(value) {
    if (value && value != '') {
      return Number((value + '').replace(/,/g, ""));
    } else {
      return 0;
    }
  }
}
