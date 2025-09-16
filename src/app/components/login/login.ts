import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule  } from '@angular/common';
import { faEye , faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";  
import { Login as loginService } from '../../service/login';
import { Auth as authService } from '../../service/auth';
import { EncryptedDto } from '../../model/EncryptedDto';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ɵInternalFormsSharedModule, CommonModule, ReactiveFormsModule, ReactiveFormsModule, FaIconComponent],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm!:FormGroup;
  fb= inject(FormBuilder);  
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showpassword = false;
  username!:string;


  constructor(private loginService : loginService , private authService: authService , private router:Router){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usernameoremail: ['', Validators.required],
      password: ['',Validators.required],
    })
    }
    onSubmit(){
      if(this.loginForm.valid){
        const {usernameoremail , password} = this.loginForm.value;
        console.log(usernameoremail , password);
        this.loginService.encryptData(usernameoremail , password).subscribe(
          {
            next : (response :EncryptedDto) => {
              const EncryptedPayload = response.payload;
              this.authService.Login(EncryptedPayload)
            },
          }
        )
      }
      else{
        console.log("invalid form")
      }
    }

      } 
 

