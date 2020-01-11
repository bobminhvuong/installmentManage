import { UserService } from './../../service/user/user.service';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isVisible = false;
  pageIndex = 1;
  pageSize = 20;
  total = 0;
  listOfData = [];
  loading = true;
  order: any[] | null = null;
  searchVL: any | null = null;
  filterGender = [{ text: 'male', value: 'male' }, { text: 'female', value: 'female' }];
  searchDataFilter: any | null = null;
  deleteParam: any | null = null;
  dataEdit: any | null = null;


  constructor( private modalService: NzModalService, private userSV: UserService) { }

  ngOnInit() {
    this.searchData();
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    let filter = {
      limit: this.pageSize,
      offset: (this.pageIndex - 1) * this.pageSize,
      where: {},
      order: [['createdAt', 'DESC']]
    };

    if (this.order && !reset) {
      let ft = {
        order: []
      };
      ft.order.push(this.order);
      filter.order = ft.order;
    }

    if (this.searchVL && this.searchVL.value !== '' && !reset) {
      filter.where[this.searchVL.key] = { like: `.$.${this.searchVL.value}.$.` };
    }

    if (this.searchDataFilter && !reset) {
      filter.where[this.searchDataFilter.key] = this.searchDataFilter.value;
    }

    this.getAll(filter);
  }

  updateFilter(value: string[], data): void {

    if (value.length == 0) {
      this.searchData(true);
    } else {
      let tmp = {
        key: '',
        value: ''
      };
      tmp.key = data.key;
      tmp.value = value[0];
      this.searchDataFilter = tmp;
      this.searchData();
    }
  }

  search(value) {
    this.searchVL = value;
    this.pageIndex = 1;
    this.searchData();
  }

  reset() {
    this.searchData(true);
  }

  sort(sort: { key: string; value: string }): void {
    let sortValue = sort.value === 'descend' ? 'DESC' : 'ASC';
    this.order = [sort.key, sortValue];
    this.searchData();
  }

  delete(value): void {
    this.deleteParam = value;
    this.modalService.confirm({
      nzTitle: 'Delete',
      nzContent: 'Bạn có chắc chắn xóa mục này?',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        this.userSV.deleteUser(this.deleteParam.id).subscribe(r => {
          this.searchData();
        });
      }
    });
  }

  getAll(filter) {
    this.userSV.getAll(0).subscribe(res => {
      this.listOfData = res.data;
      this.loading = false;
      this.total = res.count;
    });
  }

  handleCorU(user) {
    this.dataEdit = user ? user : {};
    this.isVisible = true;
  }

  closeModal(e) {
    this.isVisible = e;
    this.searchData(true);
  }

}
