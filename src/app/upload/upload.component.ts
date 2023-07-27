import { Component } from '@angular/core';
import { MinioServiceService } from '../minio-service.service';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  constructor(private minioServerice: MinioServiceService, private http: HttpClient) { }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0]; // Get the selected file from the event
    this.upObj['file'].setValue(selectedFile); // Update the value of the form control with the selected file
  }
  

  upObj: { [key: string]: FormControl } = {
    file: new FormControl(''),
    bucket: new FormControl(''),
    secretKey: new FormControl('', [Validators.required]),
    privateKey: new FormControl('', [Validators.required]),
  }

  upload() {
    if (this.upObj['file'].value) {
      const file = this.upObj['file'].value;
  
      // Read the selected file using FileReader
      const fileReader = new FileReader();
      fileReader.onload = (event: any) => {
        const base64String = event.target.result.split(',')[1]; // Extract the base64 string from the data URL
        this.uploadWithBase64(base64String); // Call the uploadWithBase64 method
      };
      fileReader.readAsDataURL(file);
    } else {
      alert('Please select a file.');
    }
  }
  

  uploadWithBase64(base64String: string) {
    const upObjFinal = {
      file: base64String, // Set the file property to the base64 string
      secretKey: this.upObj['secretKey'].value,
      privateKey: this.upObj['privateKey'].value,
      metaData: { ...this.getMetaFieldValuesObject() },
    };
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
}