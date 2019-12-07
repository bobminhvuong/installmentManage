import { Router } from '@angular/router';
import { GlobalDataService } from 'src/app/service/globalData/global-data.service';
import { UserService } from './service/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dvdsclient';
  constructor(private userSV: UserService, private router: Router, private globalSV: GlobalDataService) { }
  ngOnInit() {
    this.userSV.getCurrentUser().subscribe(res => {
      if (!res || res.status && res.status === 500) {
        localStorage.clear();
        this.router.navigate(['/login']);
      } else {
        this.globalSV.setCurrentUser(res);
      }
    });
  }
}
