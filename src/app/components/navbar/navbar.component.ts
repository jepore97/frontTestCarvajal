import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import {Product} from 'src/app/models/products.model'
import { CartService } from 'src/app/services/cart.service';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public totalItem : number = 0;
  public searchTerm !: string;
  constructor(private cartSvc : CartService,private productSvc:ProductsService,private wishSvc:WishService) { }

  ngOnInit(): void {
    this.wishSvc.getAllWish().subscribe((res:any)=>{
      
      res.forEach((pro:any)=>{
        if(pro&&pro.producto){
          this.cartSvc.productList.next([...this.cartSvc.productList.getValue(),pro.producto])
        }
        
      })

    })
    
    this.cartSvc.productList
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.productSvc.search.next(this.searchTerm);
  }
}

