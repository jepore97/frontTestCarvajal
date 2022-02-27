import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthService{

    uri = 'http://localhost:5000/api';
    // token;
    controller='users'

    constructor(private http: HttpClient, private router: Router) { }
    login(email:String, password:String) {

        this.http.post(`${environment.baseURL}/${this.controller}/login`, { email: email, password: password })
            .subscribe((resp: any) => {

                this.router.navigate(['profile']);
                localStorage.setItem('auth_token', resp.token);

            });
        ;

    }

}
