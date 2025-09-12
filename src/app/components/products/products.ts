import { Component } from '@angular/core';
import { Product as ProductService } from '../../service/product';
import { Product } from '../../model/Product';
import { CommonModule } from '@angular/common';
import { ResponseDto } from '../../Common/ResponseDto';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products  {
  products: any[] = []; 
  productDetails: any = null;
  page: number = 0;
  size: number = 10;
  isViewingDetails: boolean = false;

  constructor(private ProductService: ProductService) {}

  ngOnInit(): void {
    console.log('Fetching products...');
    this.ProductService.getProducts(this.page, this.size).subscribe({
      next: (response) => {
        console.log('Products fetched successfully:', response);
        this.products = (response.data ?? []).map((p : any)=>({
          ...p,
           image: p.imageBase64 && p.imageBase64.length > 0 
          ? `data:image/jpeg;base64,${p.imageBase64}`
          : null
        }));
        console.log(this.products);
      },
      error: (err) => {
        console.error('Error fetching products:', err); 
      }
    });
  }

  viewProductDetails(productId: number): void {
    console.log(`Fetching details for product ID: ${productId}`);
    this.isViewingDetails = true;
    this.ProductService.getProductById(productId).subscribe({
        next: (response) => { 
          this.productDetails = {
            ...response.data,
           image: (response.data as any).imageBase64 
    ? `data:image/jpeg;base64,${(response.data as any).imageBase64}`
    : null,
          }
        },
          error: (err) => {
        console.error('Error fetching products:', err); 
      }
      });
  }
}
  
