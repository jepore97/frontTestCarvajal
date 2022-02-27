import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/products.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Product[]=[]
  filterProduct:Product[]=[]
  searchKey:string ="";
 
  constructor(private productSvc:ProductsService,private cartSvc: CartService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productSvc.getAllProducts().subscribe((data: any)=>{
      if(data.length>0){
        this.products=data
        this.filterProduct=data
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
