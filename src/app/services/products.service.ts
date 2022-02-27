import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {Product} from '../models/products.model'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public search = new BehaviorSubject<string>("");
   controller='products'
  constructor(private http: HttpClient) {}
  getAllProducts() {
    return this.http.get(`${environment.baseURL}/${this.controller}`);
  }
  getOneProduct(producto:Product) {
    return this.http.get(`${environment.baseURL}/${this.controller}/${producto.id}`);
  }
  getCartItems() {
    return this.http.get(`${environment.baseURL}${this.controller}//cart`);
  }
  increaseQty(payload:any) {
    return this.http.post(`${environment.baseURL}${this.controller}//cart`, payload);
  }
  emptyCart() {
    return this.http.delete(`${environment.baseURL}${this.controller}/cart/empty-cart`);
  }
}
