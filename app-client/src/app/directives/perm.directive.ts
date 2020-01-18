import { MainService } from './../service/main.service';
import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPerm]'
})
export class PermDirective {
  @Input('appPerm') appPerm: string;
  constructor(public el: ElementRef, public mainSv: MainService) { }

  ngOnInit() {
    let role = `${this.appPerm}` || '';
    let user = this.mainSv.getCurrentUser();
    if (user.type != 'admin' && role != user.type) {
      this.el.nativeElement.remove();
    }
    // [appPerm]="'user'"
  }

}
