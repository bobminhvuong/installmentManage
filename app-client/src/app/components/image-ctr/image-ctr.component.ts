import { FileUploadService } from './../../service/fileUpload/file-upload.service';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-image-ctr',
  templateUrl: './image-ctr.component.html',
  styleUrls: ['./image-ctr.component.scss']
})
export class ImageCtrComponent implements OnInit {
  uploading = false;
  fileList: UploadFile[] = [];
  imgUpload: any | null = null;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onOk = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onCancel = new EventEmitter();
  @Input() isVisible = false;
  constructor(private message: NzMessageService, private fileService: FileUploadService) { }

  ngOnInit() {
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }

  handleUpload(): void {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    this.uploading = true;

    this.fileService.uploadImage(formData,'').subscribe(r => {
      this.uploading = false;
      this.imgUpload = r;
      this.message.create('success', `Hình ảnh đã được tải lên hệ thống!`);
    });
  }

  handleOk(): void {
    this.onOk.emit(this.imgUpload);
  }

  handleCancel(): void {
    this.onCancel.emit(true);
  }

}
