import { Component  , inject, OnInit} from '@angular/core';
import { FormGroup , FormArray , FormBuilder , FormControl, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { userDto } from '../../model/userDto';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {

 registerationForm !: FormGroup;
 roles = ['user' , 'seller'];
  fb = inject(FormBuilder);
  user!:userDto;

  ngOnInit(): void {
    this.registerationForm = this.fb.group({
     role:['',Validators.required],
     username:[''],
     password:[''],
     address:[''],
     phoneNumber :[''],
      email : [''],
      brandName:[''],
      deliveryPinCodes: this.fb.array([]),
      brandLogo:['']
    });

    this.registerationForm.get('role')?.valueChanges.subscribe(role => {
      this.updateForm(role);
    });
  }

  get DeliveryPinCodes(): FormArray {
    return this.registerationForm.get("deliveryPinCodes") as FormArray<FormControl<string>>;
  }

  addDeliveryPinCodes(pincode: string) {
    this.DeliveryPinCodes.push(new FormControl(pincode, Validators.required));
  }

  removeDeliveryPinCodes(i: number) {
    this.DeliveryPinCodes.removeAt(i);
  }

  updateForm(role: string) {
    ['username' , 'password' , 'address','phoneNumber'].forEach(field =>{
      this.registerationForm.get(field)?.clearValidators();
      this.registerationForm.get(field)?.updateValueAndValidity();
    })
    this.DeliveryPinCodes.clear();

    if(role === 'user'){
      ['username' , 'password','address' , 'phoneNumber'].forEach(field=>{
        this.registerationForm.get(field)?.setValidators(Validators.required);
        this.registerationForm.get(field)?.updateValueAndValidity();})
    }
    else if(role === 'seller'){
      ['brandName', 'address' , 'phoneNumber', 'brandLogo'].forEach(field=>{
        this.registerationForm.get(field)?.setValidators(Validators.required);
        this.registerationForm.get(field)?.updateValueAndValidity();
      });
     this.registerationForm.get('email')?.setValidators([Validators.required , Validators.email]);
     this.registerationForm.get('email')?.updateValueAndValidity();
    }
  }
  
      onSubmit(){
     if(this.registerationForm.valid){
      this.user.username= this.registerationForm.get('username')?.value;
      this.user
      
     }else{
      console.log("Form is not valid");
     }
    }
  
  }
