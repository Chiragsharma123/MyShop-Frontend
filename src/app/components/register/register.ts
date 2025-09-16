import { Component  , inject, OnInit} from '@angular/core';
import { FormGroup , FormArray , FormBuilder , FormControl, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { userDto } from '../../model/userDto';
import { Register as registerService } from '../../service/register';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faClose , faEye , faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { SellerDto } from '../../model/SellerDto';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, FaIconComponent],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {

 registerationForm !: FormGroup;
 roles = ['user' , 'seller'];
  fb = inject(FormBuilder);
  user!:userDto;
  seller !: SellerDto;
  isRegistered ! : boolean;
  registerationMessage!: string;
  showRegisterMessage=false;
  faClose = faClose;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showpassword = false;

  constructor(private registerService : registerService){}

  closeMessage(){
    this.showRegisterMessage = false;
  }

  onFileSelected(event: any) {
  const file: File = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      this.registerationForm.patchValue({
        brandLogo: base64String
      });
    };

    reader.readAsDataURL(file); // read file as base64
  }
}

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
    if(this.registerationForm.get('role')?.value === 'user'){
    this.user={
      username:this.registerationForm.get('username')?.value,
      password:this.registerationForm.get('password')?.value,
      address:this.registerationForm.get('address')?.value,
      role:this.registerationForm.get('role')?.value,
      phoneNumber:this.registerationForm.get('phoneNumber')?.value,
    };

    this.registerService.registerUser(this.user).subscribe({
          next:((response : any) =>{
            this.registerationMessage = response.message;
            this.showRegisterMessage = true;
            if(response.statusCode === 200){
              this.isRegistered=true;
              this.registerationForm.reset();
            }else{
              this.isRegistered=false;
            }
            setTimeout(()=>{this.showRegisterMessage = false} , 5000)
          })
        });
    }
      
     }else if(this.registerationForm.get('role')?.value === 'seller'){
       const pinCodesArray: string[] = this.DeliveryPinCodes.value;
      this.seller={
        name : this.registerationForm.get('name')?.value,
        roleId : 1,
        email : this.registerationForm.get('email')?.value,
        password : this.registerationForm.get('password')?.value,
        brandName:this.registerationForm.get('brandName')?.value,
        address : this.registerationForm.get('address')?.value,
        phoneNumber :this.registerationForm.get('phoneNumber')?.value,
        imageData : this.registerationForm.get('brandLogo')?.value,
        delivery_pinCodes : pinCodesArray.join(","),
        id:0
      } 
      this.registerService.registerSeller(this.seller).subscribe({
        next:((response :any)=>{
          this.registerationMessage = response.message;
            this.showRegisterMessage = true;
            if(response.statusCode === 200){
              this.isRegistered=true;
              this.registerationForm.reset();
            }else{
              this.isRegistered=false;
            }
            setTimeout(()=>{this.showRegisterMessage = false} , 5000)
        })
      })
     }
    }
  
  }
