import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import {Product} from 'src/app/models/products.model'
import { CartService } from 'src/app/services/cart.service';
import { WishService } from 'src/app/services/wish.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public totalItem : number = 0;
  public searchTerm !: string;                 // {1}
   isLoggedIn:boolean=false;
   name=localStorage.getItem('name');
  constructor(private cartSvc : CartService,private productSvc:ProductsService,private wishSvc:WishService,private authService: AuthService) { }

  ngOnInit(): void {
    
    this.authService.isLogged().subscribe(res=>{
      this.name=localStorage.getItem('name');
      this.isLoggedIn=res
    });
    this.wishSvc.getAllWish().subscribe((res:any)=>{
      res.forEach((pro:any)=>{
        if(pro&&pro.product){
          this.cartSvc.productList.next([...this.cartSvc.productList.getValue(),pro.product])
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
  logout() {
    localStorage.clear();
    this.authService.logout();
  }
}

