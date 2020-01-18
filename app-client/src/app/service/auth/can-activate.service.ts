import { MainService } from './../main.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate {

  constructor(private router: Router,private mainSV: MainService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let tokenUser = localStorage.getItem('x-key-x-u-log');
    let user = tokenUser ? JSON.parse(tokenUser) : {};

    if(next.data.role == 'LOGIN'){
      if (!tokenUser) {
        this.router.navigate(['']);
      }
      return tokenUser ? true : false;
    }
    
    if(next.data && user && (user.type == 'admin' || next.data.role == user.type)){
      return true;
    }
   
  }
}
