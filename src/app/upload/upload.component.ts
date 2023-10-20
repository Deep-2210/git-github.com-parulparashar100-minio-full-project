import { Component } from '@angular/core';
import { MinioServiceService } from '../minio-service.service';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

import { Location } from '@angular/common';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})

export class UploadComponent {
  metaCount = 0;
  metaActive: string = 'no';
  metaFieldValues: { name: string, value: string }[] = [];
  uploadInProgress = false;
  uploadProgress = 0;

  constructor(private minioServerice: MinioServiceService, private http: HttpClient, private toastr: ToastrService) { }

  onFileSelected(event: any) {
    const selectedFiles: FileList = event.target.files; // Get the selected files from the event
    const filesArray: File[] = Array.from(selectedFiles); // Convert the FileList to an array

    // Create a new array to hold the file FormControl instances
    const fileFormControls: FormControl[] = [];

    // Create a new FormControl for each selected file and push it to the array
    filesArray.forEach((file: File) => {
      const fileFormControl = new FormControl(file);
      fileFormControls.push(fileFormControl);
    });

    // Update the value of the 'file' property with the array of FormControl instances
    this.upObj['file'].setValue(fileFormControls);
  }
  

  upObj: { [key: string]: FormControl } = {
    file: new FormControl(''),
    fileName: new FormControl(''),
    bucket: new FormControl(''),
    secretKey: new FormControl('', [Validators.required]),
    privateKey: new FormControl('', [Validators.required]),
  }


  upload() {
    const fileFormControls: FormControl[] = this.upObj['file'].value;

    fileFormControls.forEach((fileFormControl: FormControl) => {
      const file: File = fileFormControl.value;

      if (file) {
        const fileReader = new FileReader();
        fileReader.onload = (event: any) => {
          const base64String = event.target.result.split(',')[1];
          this.uploadWithBase64(base64String);
          this.toastr.success(file.name+' uploaded....', '', { timeOut: 2000 });
        };
        fileReader.readAsDataURL(file);
        
      } else {
        this.toastr.error('Please select a file.', '', { timeOut: 2000 });
      }
    });
  }

  uploadWithBase64(base64String: any) {
    const upObjFinal = {
      file: base64String,
      fileName: this.upObj['fileName'].value,
      bucketName: this.upObj['bucket'].value,
      secretKey: this.upObj['secretKey'].value,
      privateKey: this.upObj['privateKey'].value,
      metaData: { ...this.getMetaFieldValuesObject() },
    };
    console.log(this.upObj['fileName'].value);
    this.minioServerice.upTrail(upObjFinal).subscribe((data) => console.log(data));
  }

  addMeta() {
    this.metaCount++;
    const metaField = {
      name: '',
      value: ''
    };
    this.metaFieldValues.push(metaField)
  }

  getMetaFieldValuesObject() {
    const metaData: { [key: string]: { name: string; value?: string } } = {};
    for (let i = 0; i < this.metaFieldValues.length; i++) {
      const metaFieldName = 'meta ' + (i + 1);
      metaData[metaFieldName] = { ...this.metaFieldValues[i] };
    }
    return metaData;
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

  isUploadDisabled(): any {
    // Check if any mandatory field is empty
    const mandatoryFieldsEmpty = !this.upObj['file'] ||
      this.upObj['bucket'].invalid ||
      this.upObj['secretKey'].invalid ||
      this.upObj['privateKey'].invalid;
  
    // Disable the button if any mandatory field is empty
    return mandatoryFieldsEmpty;
  }
}