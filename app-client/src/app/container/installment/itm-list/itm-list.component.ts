import { MainService } from './../../../service/main.service';
import { UserService } from './../../../service/user/user.service';
import { CustomerService } from './../../../service/customer/customer.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { InvoiceService } from './../../../service/invoice/invoice.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-itm-list',
  templateUrl: './itm-list.component.html',
  styleUrls: ['./itm-list.component.scss']
})
export class ItmListComponent implements OnInit {

  isVisible = false;
  pageIndex = 1;
  pageSize = 20;
  total = 1;
  listOfData = [];
  loading = true;
  filterForm: FormGroup;
  dataEdit: any;
  lsStatus = [];
  isVisiblePay = false;
  isVisibleCost = false;
  customers = [];
  customer_id = 0;
  users = [];
  selectedUser = null;
  selectedStatus = null;
  filter = {
    offset: 0,
    limit: this.pageSize,
    customer_id: 0,
    user_id_capital: 0,
    date: null,
    find: '',
    active: 1,
    status_id: 0,
    from: '',
    to: ''
  }
  timeId: any;
  curUser: any;

  searchCustomer: string;

  constructor(private invSv: InvoiceService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private customerSV: CustomerService,
    private userSV: UserService,
    private mainSV: MainService) { }

  ngOnInit() {
    this.curUser = this.mainSV.getCurrentUser();
    this.getAll();
    // this.getCustomers();
    this.getStatus();
    let date = new Date();

    // this.filter.date = [date,date.setMonth(date.getMonth() -1)]

    if(this.curUser.type == 'admin'){
      this.userSV.getAll(true).subscribe(r=>{
        if(r && r.status ==1){
          this.users = r.data;
        }
      })
    }
  }

  getCustomers(ft) {
    this.customerSV.getAll(ft).subscribe(r => {
      if (r && r.status == 1) {
        this.customers = r.data;
      }
    })
  }

  getStatus() {
    this.invSv.getStatus().subscribe(r => {
      if (r.status == 1) {
        this.lsStatus = r.data;
      }
    })
  }

  getAll() {
    this.filter.offset = (this.pageIndex - 1) * this.pageSize;
    this.filter.limit = this.pageSize;
    this.filter.from = this.filter.date && this.filter.date[0] ? moment(this.filter.date[0]).format('DD/MM/YYYY') : ''
    this.filter.to = this.filter.date && this.filter.date[1] ? moment(this.filter.date[1]).format('DD/MM/YYYY') : ''
    if(this.curUser.type == 'user'){
      this.filter.user_id_capital = this.curUser.id;
    }
    this.invSv.getAll(this.filter).subscribe(res => {
      this.listOfData = res.data;
      this.loading = false;
      this.total = res.total;
    });
  }

  filterData(): void {
    this.filter.status_id = this.selectedStatus ?  this.selectedStatus : 0;
    this.filter.user_id_capital = this.selectedUser;
    this.getAll();
  }

  handleCorU(client) {
    this.dataEdit = client ? client : {};
    this.isVisible = true;
  }

  closeModal(e) {
    this.isVisible = e;
    this.getAll();
  }

  panigate() {
    this.getAll();
  }

  payContact(data) {
    this.isVisiblePay = true;
    this.dataEdit = data;
  }
  closeModalPay(val) {
    this.isVisiblePay = false;
  }

  closeModalCost(val) {
    this.isVisibleCost = false;
  }

  addCost(val) {
    this.dataEdit = val;
    this.isVisibleCost = true;
  }

  formatCurrency(val) {
    if (val && val != '') {
      val = Number((val + '').replace(/,/g, ""));
      return val.toLocaleString();
    } else return '';
  }

  setBadDebt(data) {
    this.modalService.confirm({
      nzTitle: 'Thêm hợp đồng vào nợ xấu?',
      nzOkText: 'Xác nhận',
      nzOkType: 'danger',
      nzOnOk: () => this.changeStatusContact(4, data.id),
      nzCancelText: 'Hủy',
    });
  }

  cancelContact(data) {
    this.modalService.confirm({
      nzTitle: 'Bạn muốn hủy hợp đồng này?',
      nzOkText: 'Xác nhận',
      nzOkType: 'danger',
      nzOnOk: () => this.changeStatusContact(2, data.id),
      nzCancelText: 'Hủy',
    });
  }

  changeStatusContact(status, id_iv) {
    let data = {
      status_id: status,
      invoice_id: id_iv
    }
    this.invSv.changeStatus(data).subscribe(r => {
      if (r && r.status == 1) {
        this.message.create('success', 'Cập nhật hợp đồng thành công!');
        this.getAll();
      } else {
        this.message.create('error', r && r.message ? r.message : 'Đã có lổi xẩy ra. Vui lòng thử lại');
      }
    })
  }

  onSearchCustomer(value: string): void {
    // this.customers = value ? [value, value + value, value + value + value] : [];
    this.filter.customer_id = 0;
    if (value != '') {
      let ft = {
        find: value,
        offset: 0,
        limit: 10
      }
      clearTimeout(this.timeId);
      this.timeId = setTimeout(() => {
        this.getCustomers(ft);
      }, 500);


    }
  }

  chooseUser(val){
    this.filter.customer_id = val;
  }
  
}
