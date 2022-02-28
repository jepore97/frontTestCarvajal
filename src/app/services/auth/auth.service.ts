import { environment } from '../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})
export class AuthService{

    controller='users'
    public loggedIn = new BehaviorSubject<boolean>(false); // {1}

    isLogged() {
    localStorage.getItem('auth_token')?this.loggedIn.next(true):this.loggedIn.next(false);
    return this.loggedIn.asObservable();
    }
    
    constructor(private http: HttpClient, private router: Router,private cartSvc : CartService,private toastr:ToastrService) { }
    login(email:String, password:String) {

        this.http.post(`${environment.baseURL}/${this.controller}/login`, { email: email, password: password })
            .subscribe((resp: any) => {
                if(resp.signed_user){
                    localStorage.setItem('name', resp.signed_user.name);
                    localStorage.setItem('id_user', resp.signed_user.id);
                    this.cartSvc.loadWishes();
                    localStorage.setItem('auth_token', resp.token);
                    this.loggedIn.next(true);
                    this.router.navigate(['/products']);
                }else{
                    this.toastr.error('Usuario o contraseña invalidos');
                }
                
                
                

            });
        ;

    }
    logout() {                            
        localStorage.clear();
        this.loggedIn.next(false);
        this.router.navigate(['login']).then(() => {
            window.location.reload();
          });;
        this.cartSvc.productList.next([]);
      }
    

}
