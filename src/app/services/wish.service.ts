import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {Product} from '../models/products.model'
@Injectable({
  providedIn: 'root'
})
export class WishService {
   controller='wish'
  constructor(private http: HttpClient) {}
  getAllWish() {
    return this.http.get(`${environment.baseURL}/${this.controller}/1`);
  }
  createWish(product:Product,user_id:Number) {
      const body={
        "user_id":user_id,
        "product_id":product.id
     }
    return this.http.post(`${environment.baseURL}/${this.controller}`,body);
  }
//   getCartItems() {
//     return this.http.get(`${environment.baseURL}${this.controller}//cart`);
//   }
  deleteWish(product_id:number,user_id:number) {
    const wish={
      'product_id':product_id,
      'user_id':user_id
    }
    return this.http.post(`${environment.baseURL}/${this.controller}/deletewish`, wish);
  }
  emptyWish() {
    return this.http.delete(`${environment.baseURL}/${this.controller}/1`);
  }
}
