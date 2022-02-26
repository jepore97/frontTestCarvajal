import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:any[]=[]
  filterProduct:any[]=[]
  searchKey:string ="";
 
  constructor(private productSvc:ProductsService,private cartSvc: CartService) { }

  ngOnInit(): void {
    this.productSvc.getAllProducts().subscribe((data: any)=>{
      if(data.length>0){
        data.forEach((pro:any) => {
          pro.cantidad=1;
        });
        this.products=data
        this.filterProduct=data
        console.log('this.product: ', this.products);
      }
      this.productSvc.search.subscribe((val:any)=>{
        this.searchKey = val;
      })

    })
  }
  addtocart(item: any){
    this.cartSvc.addtoCart(item);
  }
  
}
