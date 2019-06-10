import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';


@Injectable()
export class AuthService {
  
  baseUrl = environment.baseUrl;
  loginUrl = `https://api-pricing.axiqoe.com/sales/login`;
  registerUrl = `https://api-pricing.axiqoe.com/sales/register`;
  token = localStorage.token;
  httpOptions;

  constructor(private http: HttpClient, 
              private router: Router,
              public jwtHelper: JwtHelperService) { }

  data: any = {};

  getHeader() {
    return {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('token')
    })};
  };

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(body) {
      this.http.post(this.loginUrl, body, this.getHeader()).subscribe(
        res => {
          this.data = res;
          localStorage.setItem('token',this.data.token);
          localStorage.setItem('id', this.data.id);
          localStorage.setItem('name', this.data.name);
          this.router.navigate(['/listofapproval']);
        });
  }

  register(body) {
  this.http.post(this.registerUrl, body, this.getHeader()).subscribe(
    res => {
      alert('Register success');
      this.router.navigate(['/login']);
  },
    err=>{
      let error = err.error;
      alert(error);
    }
  );
}

logout(){
  localStorage.clear();
  this.router.navigate(['/login']);
}

}