import { Directive, Input, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFormatVN]',
  host: {
    '[value]': 'appFormatVN',
    '(input)': 'format($event.target.value)'
  }
})
export class FormatVNDirective {

  @Input() appFormatVN: string;
  @Output() appFormatVNChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(public el: ElementRef) {
    this.el.nativeElement.onkeypress = (evt) => {
      this.el.nativeElement.onkeypress = (evt) => {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
          theEvent.returnValue = false;
          if (theEvent.preventDefault) theEvent.preventDefault();
        }
      };
    };
  }
 
  ngOnInit() {
    this.appFormatVN = this.appFormatVN || '';
    this.format(this.appFormatVN);
  }

  format(value) {
    if (value && value != '') {
      let val = Number((value + '').replace(/,/g, ""));
      this.appFormatVNChange.next(val.toLocaleString());
    } else {
      this.appFormatVNChange.next('');
    }
  }
}
