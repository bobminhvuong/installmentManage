import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate {

  constructor(private router: Router) { }
  canActivate() {
    const tokenUser = localStorage.getItem('user');
    if (!tokenUser) {
      this.router.navigate(['']);
    }
    return tokenUser ? true : false;
  }
}
