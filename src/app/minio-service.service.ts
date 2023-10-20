import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MinioServiceService {

  private baseUrl1 = 'http://localhost:8082/users/upload';
  private baseUrl2 = 'http://localhost:8082/users/download';

  constructor(private http: HttpClient) { }

  upTrail(data1:any){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(data1);
    console.log(data1.metaData);

    return this.http.post(this.baseUrl1,body,{'headers':headers});

    // return this.http.post(this.baseUrl1,data1);
  }

  // downloadFile(data2:any){
  //   return this.http.post(this.baseUrl2, data2);
  // }

  downloadFile(data2:any){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(data2);
    console.log(body)
    return this.http.post(this.baseUrl2,body,{'headers':headers});
  }

  
}