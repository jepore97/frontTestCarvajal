import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  CanActivate, 
  Router, 
  RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
    let islogged:boolean=true;
    // If the user is not logged in we'll send them back to the home page

    this.authService.loggedIn.subscribe(res=>{
      if(!res){
        this.router.navigate(['/login']);
        islogged=res;
      }else{
        islogged=res
      }

    });
    return islogged
    
}
}