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
      if (evt.which < 48 || evt.which > 57) {
        evt.preventDefault();
      }
    };
  }

  ngOnInit() {
    this.appFormatVN = this.appFormatVN || '';
    this.format(this.appFormatVN);
  }

  format(value) {
    if(value && value != ''){
      let val = Number((value + '').replace(/,/g, ""));
      this.appFormatVNChange.next(val.toLocaleString());
    }else{
      this.appFormatVNChange.next('');
    }
  }
}
