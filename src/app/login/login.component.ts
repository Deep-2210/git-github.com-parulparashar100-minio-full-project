import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {


  canActivate(): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    throw new Error('Method not implemented.');
  }


  public loginForm!: FormGroup
  flag!: boolean
  constructor(private renderer: Renderer2, private el: ElementRef, private authService: AuthServiceService, private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement.querySelector('.card.auth'), 'active');
    this.loginForm=this.formBuilder.group({
      email:[''],
      password:['']
    })
  }
  
  login(){
    this.authService.login(this.loginForm.value).subscribe(res=>{
      const user=res.find((a:any)=>{
        return a.email===this.loginForm.value.email && a.password===this.loginForm.value.password
      });
      if(user){
        this.flag=user
        alert("Login Successfull");
        this.loginForm.reset();
        this.router.navigate(['upload'])
      }else{
        this.flag=user
        alert("user not found");
      }
    })

  }

}
