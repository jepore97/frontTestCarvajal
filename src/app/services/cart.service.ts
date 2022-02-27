import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/products.model';
import { ProductsService } from './products.service';
import { WishService } from './wish.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {

    public cartItemList : any =[]
    public productList = new BehaviorSubject<any[]>([]);
  
    constructor(private toastr: ToastrService,private productSvc:ProductsService,private wishSvc:WishService) { }
    getProducts(){
      return this.productList.asObservable();
    }
  
    setProduct(product : any){
      this.cartItemList.push(...product);
      this.productList.next([...this.productList.getValue(),product]);
    }

    addtoCart(product : any){
      this.cartItemList=this.productList.getValue()
      if(this.cartItemList.length>0){
       if( this.cartItemList.find((item:any)=>item.id==product.id)){
        this.toastr.warning('Producto ya existe en carrito');
       }else{
        this.wishSvc.createWish(product,1).subscribe(res=>{
        if(res){
          this.productList.next([...this.productList.getValue(),product]);
          this.toastr.success('Producto añadido a tu lista de deseos');
          this.cartItemList.push(product);
          
        }else{
          this.toastr.error('Ha ocurrido un error');
        }
        })
        
      }
      
    }else{
      this.wishSvc.createWish(product,1).subscribe(res=>{
        if(res){
          this.productList.next([...this.productList.getValue(),product]);
          this.toastr.success('Producto añadido a tu lista de deseos');
          this.cartItemList.push(product);
          
        }else{
          this.toastr.error('Ha ocurrido un error');
        }
        })
    }
      this.getTotalPrice();
    }

    getTotalPrice() : number{
      let grandTotal = 0;
      this.cartItemList.map((a:any)=>{
        grandTotal += a.price;
      })
      return grandTotal;
    }
    removeCartItem(product: any){
      this.cartItemList=this.productList.getValue();
      this.wishSvc.deleteWish(product.id,1).subscribe(res=>{
        if(res){
          this.cartItemList
          this.toastr.success('Producto borrado de tu lista de deseos');
          this.cartItemList.map((a:any, index:any)=>{
            if(product.id===a.id){
              this.cartItemList.splice(index,1);
            }
          })
          this.productList.next(this.cartItemList);
        }
      })
      
    }
    removeAllCart(){
      this.wishSvc.emptyWish().subscribe(res=>{
        if(res){
          this.cartItemList = []
          this.toastr.success('Lista borrada correctamente');
          this.productList.next(this.cartItemList);
          
        }
      })
      return this.productList.getValue();
    }

}
