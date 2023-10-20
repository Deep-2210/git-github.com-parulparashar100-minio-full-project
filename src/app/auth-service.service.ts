import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  a!:boolean

  constructor(private http: HttpClient) { }

  login(data: any):Observable<any>{
    console.log('I am a login server');
    this.a=true;
    return this.http.get(`http://localhost:3000/signupUsers`, data);
  }


  signUp(data: any):Observable<any>{
    console.log('I am a SignUp server');
    return this.http.post(`http://localhost:3000/signupUsers`, data)
  }

  isAuthenticatedUser(): boolean {
    return this.a;
  }


}
