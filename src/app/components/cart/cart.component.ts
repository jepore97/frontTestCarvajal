import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { WishService } from 'src/app/services/wish.service';
import {Product} from '../../models/products.model'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
   products:any= [];
   wishProducts=[]
  public grandTotal !: number;
  
  constructor(private cartSvc : CartService,) { }

  ngOnInit(): void {

    
    this.cartSvc.getProducts()
    .subscribe(res=>{
      this.products = res;
          this.grandTotal = this.cartSvc.getTotalPrice();
      
    })
  }
  removeItem(item: any){
    this.cartSvc.removeCartItem(item);
  }
  emptyCart(){
    this.products=this.cartSvc.removeAllCart();
  }
}
