import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/products.model';
import { ProductsService } from './products.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {

    public cartItemList : any =[]
    public productList = new BehaviorSubject<any>([]);
  
    constructor(private toastr: ToastrService,private productSvc:ProductsService) { }
    getProducts(){
      return this.productList.asObservable();
    }
  
    setProduct(product : any){
      this.cartItemList.push(...product);
      this.productList.next(product);
    }

    addtoCart(product : any){
      if(this.cartItemList.length>0){
       if( this.cartItemList.find((item:any)=>item.id==product.id)){
        this.toastr.warning('Producto ya existe en carrito');
       }else{
        product.cantidad=1
        product.total=product.price
        this.cartItemList.push(product);
      }
      
    }else{
      product.cantidad=1
      product.total=product.price
      this.cartItemList.push(product);
    }
      
      this.productList.next(this.cartItemList);
      this.getTotalPrice();
    }

    getTotalPrice() : number{
      let grandTotal = 0;
      this.cartItemList.map((a:any)=>{
        grandTotal += a.total;
      })
      return grandTotal;
    }
    removeCartItem(product: any){
      this.cartItemList.map((a:any, index:any)=>{
        if(product.id=== a.id){
          this.cartItemList.splice(index,1);
        }
      })
      this.productList.next(this.cartItemList);
    }
    removeAllCart(){
      this.cartItemList = []
      this.productList.next(this.cartItemList);
    }

    saveCart(products:Product[]){
      products.forEach(producto=>{
        this.productSvc.getOneProduct(producto).subscribe((product:any)=>{
          if(producto.cantidad&& producto.cantidad<=product.stock){
  
          }else{
            this.toastr.warning(`el producto ${producto.name} cuenta con ${product.stock} unidades disponibles`);
          }
        })
      })
    }
}
