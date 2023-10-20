import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signUpForm !: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthServiceService){}

  ngOnInit(): void {
    this.signUpForm=this.formBuilder.group({
      name:[''],
      phone:[''],
      email:[''],
      password:['']
    })
    
  }

  signUp(){
    this.authService.signUp(this.signUpForm.value).subscribe(res=>{
      alert("signup successfull");
      this.signUpForm.reset();
      this.router.navigate(['login']);
    }, err=>{
      alert("Something went wrong");
    })
  }
}
