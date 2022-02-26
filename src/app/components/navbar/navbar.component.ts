import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import {Product} from 'src/app/models/products.model'
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public totalItem : number = 0;
  public searchTerm !: string;
  constructor(private cartSvc : CartService,private productSvc:ProductsService) { }

  ngOnInit(): void {
    this.cartSvc.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.productSvc.search.next(this.searchTerm);
  }
}

