import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthService {

  loginUrl = 'http://localhost:8000/api/login';
  registerUrl = 'http://localhost:8000/api/register';
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
          let name = JSON.parse(atob(this.data.token.split('.')[1])).name;
          localStorage.setItem('token',this.data.token);
          localStorage.setItem('id', this.data.id);
          localStorage.setItem('name', this.data.name);
          console.log(localStorage.getItem('token'));
          console.log(localStorage.getItem('name'));
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
  localStorage.removeItem('token');
  localStorage.removeItem('name')
  this.router.navigate(['/login']);
}

}