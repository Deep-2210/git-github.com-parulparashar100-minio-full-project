import { Component } from '@angular/core';
import { MinioServiceService } from '../minio-service.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent {


  constructor(private minioService: MinioServiceService) { }

  upObj: { [key: string]: FormControl } = {
    fileName: new FormControl('', [Validators.required]),
    bucketName: new FormControl('', [Validators.required]),
    secretKey: new FormControl('', [Validators.required]),
    privateKey: new FormControl('', [Validators.required]),
    uuid: new FormControl('', [Validators.required])
  }

  downloadFile(): void {
    const doObjFinal = {
      fileName: this.upObj['fileName'].value,
      bucketName: this.upObj['bucketName'].value,
      secretKey: this.upObj['secretKey'].value,
      privateKey: this.upObj['privateKey'].value,
      uuid: this.upObj['uuid'].value,
    }
    
    this.minioService.downloadFile(doObjFinal).subscribe((data) => { 
      console.log(data) })
  }

  saveFile(blob: Blob): void {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'download-file';
    link.click();
  }

  getErrorMessage_secret() {
    if (this.upObj['secretKey'].hasError('required')) {
      return 'You must enter secret key';
    }

    return this.upObj['secretKey'].hasError('secretKey') ? 'Not a valid secret key' : '';
  }

  getErrorMessage_private() {
    if (this.upObj['privateKey'].hasError('required')) {
      return 'You must enter secret key';
    }

    return this.upObj['privateKey'].hasError('privateKey') ? 'Not a valid private key' : '';
  }

  // getErrorMessage_bucket() {
  //   if (this.upObj['bucket'].hasError('required')) {
  //     return 'You must enter bucket name';
  //   }

  //   return this.upObj['bucket'].hasError('bucket') ? 'Not a valid bucket' : '';
  // }

  getErrorMessage_uuid() {
    if (this.upObj['uuid'].hasError('required')) {
      return 'You must enter uuid';
    }

    return this.upObj['uuid'].hasError('uuid') ? 'Not a valid uuid' : '';
  }

}