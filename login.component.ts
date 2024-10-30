import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountServiceService } from '../../service/account.service.service';
import { Router } from '@angular/router';
import { EncrDecrService } from '../../core/encription';
import { passwordEncyptionKey } from '../../type/commonConstants';
import { Forjery, userIdentity } from '../../models/login.model';

declare function  createFingerprint(e:any):any;
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  myForm: FormGroup ;
  myForgery: Forjery;
  postData: any;
  user= new userIdentity;
  constructor(private fb: FormBuilder,private login: AccountServiceService,private router: Router,private EncrDecr: EncrDecrService){
    this.myForm = this.fb.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
    });    
    this.myForgery= new Forjery();
    this.myForgery.ftoken=createFingerprint("Login");  
  }
  public get userName() { return this.myForm.get('UserName') as FormControl };
  public get password() { return this.myForm.get('Password') as FormControl };
  onSubmit(myForm:any){


    const password1=myForm.value.Password;
    var encrypted = this.EncrDecr.set(passwordEncyptionKey.Key, password1);
    var obj={
      Password:encrypted,
      UserName:this.myForm.value.UserName,
    }
    this.login.login(obj).subscribe({
      next: (data: any) => {

     if(data!=null){
      //this.postData = data.data;
      this.user.token = data.data.jwtKey;
      this.user.isLogin = true;
      this.user.userName = this.myForm.value.UserName;
      localStorage.setItem('user', JSON.stringify(this.user));
      //localStorage.setItem('Cuid', data.ExtraData.Cuid);
      localStorage.removeItem('menu')
      localStorage.setItem("menu","12");
     this.router.navigate(['/home/dashboard']);
     }
      }})

  }
}