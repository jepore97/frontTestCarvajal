import { environment } from '../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../cart.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService{

    controller='users'
    public loggedIn = new BehaviorSubject<boolean>(false); // {1}

    isLogged() {
    localStorage.getItem('auth_token')?this.loggedIn.next(true):this.loggedIn.next(false);
    console.log('local ', localStorage.getItem('auth_token'));
    return this.loggedIn.asObservable();
    }
    
    constructor(private http: HttpClient, private router: Router,private cartSvc : CartService,) { }
    login(email:String, password:String) {

        this.http.post(`${environment.baseURL}/${this.controller}/login`, { email: email, password: password })
            .subscribe((resp: any) => {
                localStorage.setItem('name', resp.signed_user.name);
                console.log('resp.signed_user.name: ', resp.signed_user.name);
                console.log(localStorage.getItem('name'));
                
                localStorage.setItem('id_user', resp.signed_user.id);
                this.cartSvc.loadWishes();
                localStorage.setItem('auth_token', resp.token);
                this.loggedIn.next(true);
                this.router.navigate(['/products']);
                
                

            });
        ;

    }
    logout() {                            // {4}
        localStorage.clear();
        this.loggedIn.next(false);
        this.router.navigate(['login']).then(() => {
            window.location.reload();
          });;
        this.cartSvc.productList.next([]);
      }
    

}
