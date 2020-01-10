import { ReportService } from './../../../../service/report/report.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-capital-detail',
  templateUrl: './capital-detail.component.html',
  styleUrls: ['./capital-detail.component.scss']
})
export class CapitalDetailComponent implements OnInit {

  capital: any;
  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  constructor(private reportSV: ReportService) { }

  ngOnInit() {
    if (this.dataEdit) {
      this.reportSV.getReportCapitalDetail(this.dataEdit.id).subscribe(r => {
        if (r && r.status == 1) {
          this.capital = r;
        }
      })
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit(this.isVisible);
  }

}
