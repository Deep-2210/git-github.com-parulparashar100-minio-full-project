// for downloading one file only ::--
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
      //this.saveFile(data);
      console.log(data) })
  }

  saveFile(blob: any): void {
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

  getErrorMessage_uuid() {
    if (this.upObj['uuid'].hasError('required')) {
      return 'You must enter uuid';
    }

    return this.upObj['uuid'].hasError('uuid') ? 'Not a valid uuid' : '';
  }

}




// for downloading multiple files ::--
// import { Component } from '@angular/core';
// import { MinioServiceService } from '../minio-service.service';
// import { FormControl, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-download',
//   templateUrl: './download.component.html',
//   styleUrls: ['./download.component.css']
// })
// export class DownloadComponent {

//   files: { fileName: string; selected: boolean }[] = [];
//   selectAllFiles = false;

//   constructor(private minioService: MinioServiceService) { }

//   upObj: { [key: string]: FormControl } = {
//     bucketName: new FormControl('', [Validators.required]),
//     secretKey: new FormControl('', [Validators.required]),
//     privateKey: new FormControl('', [Validators.required]),
//     uuid: new FormControl('', [Validators.required])
//   }

//   downloadFiles(): void {
//     const bucketName = this.upObj['bucketName'].value;
//     const secretKey = this.upObj['secretKey'].value;
//     const privateKey = this.upObj['privateKey'].value;
//     const uuid = this.upObj['uuid'].value;


//     if (this.selectAllFiles) {
//       this.minioService.downloadFile({ bucketName, secretKey, privateKey, uuid })
//         .subscribe((data:any) => {
//           console.log(data);
//           this.saveFile(data);
//         });
//     } else {
//       const selectedFiles = this.files.filter(file => file.selected);
//       selectedFiles.forEach((file) => {
//         this.minioService.downloadFile({ fileName: file.fileName, bucketName, secretKey, privateKey, uuid })
//           .subscribe((data:any) => {
//             console.log(data);
//             this.saveFile(data);
//           });
//       });
//     }
//   }


//   saveFile(blob: Blob): void {
//     if (blob instanceof Blob) {
//       const objectURL = URL.createObjectURL(blob);
      
//       URL.revokeObjectURL(objectURL);
//     } else {
//       console.error('Invalid blob object.');
//     }
//   }

//   getErrorMessage_secret() {
//     if (this.upObj['secretKey'].hasError('required')) {
//       return 'You must enter secret key';
//     }
//     return this.upObj['secretKey'].hasError('secretKey') ? 'Not a valid secret key' : '';
//   }

//   getErrorMessage_private() {
//     if (this.upObj['privateKey'].hasError('required')) {
//       return 'You must enter secret key';
//     }
//     return this.upObj['privateKey'].hasError('privateKey') ? 'Not a valid private key' : '';
//   }

//   getErrorMessage_uuid() {
//     if (this.upObj['uuid'].hasError('required')) {
//       return 'You must enter uuid';
//     }
//     return this.upObj['uuid'].hasError('uuid') ? 'Not a valid uuid' : '';
//   }
// }
