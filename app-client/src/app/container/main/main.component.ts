import { MainService } from './../../service/main.service';
import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { GlobalDataService } from 'src/app/service/globalData/global-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public user: any;
  public menus: any;
  public currentUrl: string;
  isCollapsed = false;
  triggerTemplate: TemplateRef<void> | null = null;
  // @ViewChild('trigger') customTrigger: TemplateRef<void>;

  // changeTrigger(): void {
  //   this.triggerTemplate = this.customTrigger;
  // }
  private currentUser: any;

  constructor(private router: Router, private globalData: GlobalDataService, private mainSV: MainService) { 
  }

  ngOnInit() {
    // const token = localStorage.getItem('token');
    // this.currentUser = jwt_decode(token);
    // this.globalData.setCurrentUser(this.currentUser);

    this.user = this.mainSV.getCurrentUser();
    this.menus = this.getMenu();
    this.currentUrl = this.router.url;

  }

  getMenu() {
    return [
      {
        title: 'Trang chủ',
        url: '/manager/dashboard',
        role: ['admin'],
        icon: 'home'
      },
      {
        title: 'Trả góp',
        url: '',
        role: ['admin'],
        icon: 'pay-circle',
        subMenu: [
          {
            title: 'Danh sách hợp đồng',
            url: '/manager/installment',
            role: ['admin'],
          }
        ]
      },
      {
        title: 'Bất động sản',
        url: '',
        role: ['admin'],
        icon: 'home',
        subMenu: [
          {
            title: 'Nhà đất',
            url: '/manager/bds',
            role: ['admin'],
          }
        ]
      },
      {
        title: 'Tài sản',
        url: '',
        icon: 'hdd',
        role: ['admin'],
        subMenu: [
          {
            title: 'Danh sách',
            url: '/manager/assets',
            role: ['admin'],
          }
        ]
      },
      {
        title: 'Nhân viên',
        url: '',
        icon: 'user',
        role: ['admin'],
        subMenu: [
          {
            title: 'Danh sách',
            url: '/manager/user',
            role: ['admin'],
          }
        ]
      },
      {
        title: 'Khách hàng',
        url: '',
        icon: 'usergroup-add',
        role: ['admin'],
        subMenu: [
          {
            title: 'Danh sách',
            url: '/manager/customer',
            role: ['admin'],
          }
        ]
      }
    ]
  }

  getSelected(url) {
    return url == this.currentUrl ? true : false;
  }

  getOpenSubMenu(item) {
    // console.log(item);
    let hasItem = item.subMenu.find(e => { return e.url == this.currentUrl })
    return hasItem ? true : false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
