import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  private currentUser = new BehaviorSubject<any>({});

  private roles = new BehaviorSubject<any>({});


  constructor() { }

  setCurrentUser(user) {
    this.currentUser.next(user);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  setRoles(user) {
    this.roles.next(user);
  }

  getRoles(): Observable<any> {
    return this.roles.asObservable();
  }
}
