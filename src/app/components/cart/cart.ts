import { Component } from '@angular/core';
import { Product } from '../../model/Product';
import { Cart as CartService } from '../../service/cart';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Toastr } from '../../service/toastr';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  products: any[]=[];
  page : number = 0;
  size : number = 10;
  isShowMessage : boolean = false;
  message : string = '';

  constructor(private  cartService : CartService , private router : Router , private toast : Toastr){}

  ngOnInit():void{
     this.cartService.getAllItemsOfCart(this.page , this.size).subscribe({
      next:(response)=>{
        if(response.statusCode === 200){
         this.products = (response.data ?? []).map((p : any)=>({
          ...p,
           image: p.imageBase64 && p.imageBase64.length > 0 ? `data:image/jpeg;base64,${p.imageBase64}`
          : null
        }));
      }
       else if(response.statusCode === 400){
          this.toast.showError(response.message);
           this.router.navigate(['/login']);
        }
        else{
         this.toast.showError(response.message);
        }

      },
       error: (err) => {
        console.error('Error fetching products:', err); 
      
      }
     })
  }

  removeProduct(PId: number){
    
  }
}
