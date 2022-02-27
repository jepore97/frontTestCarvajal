import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  email = '';
  password = '';
   
  constructor(private authService: AuthService,private router: Router) {
     
  }
  Login() {
  this.authService.login(this.email, this.password)
   
  }
 
  ngOnInit() { 
    this.authService.loggedIn.subscribe(res=>{
      this.router.navigate(['/products']);
    })
  }
}
