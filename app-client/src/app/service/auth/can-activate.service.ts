import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate {

  constructor(private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(next.data);
    const tokenUser = localStorage.getItem('x-key-x-u-log');
    if (!tokenUser) {
      this.router.navigate(['']);
    }
    return tokenUser ? true : false;
  }
}
