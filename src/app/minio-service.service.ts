import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MinioServiceService {

  private baseUrl1 = 'http://localhost:8082/upload';
  private baseUrl2 = 'http://localhost:8082/download';

  constructor(private http: HttpClient) { }

  upTrail(data1:any){
    return this.http.post(this.baseUrl1,data1);
  }

  // downloadFile(data2:any){
  //   return this.http.post(this.baseUrl2, data2);
  // }

  downloadFile(fileName:string, bucketName: string, secretKey: string, privateKey: string, uuid: string): Observable<any> {
    const params = new HttpParams()
      .set('secretKey', secretKey)
      .set('privateKey', privateKey)
      .set('bucketName', bucketName)
      .set('fileName', fileName);

    return this.http.post<any>(this.baseUrl2, { params });
  }
  
}