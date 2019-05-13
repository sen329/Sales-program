import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

import { AuthService } from './auth.service';

import { error } from 'util';
import { Product } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = environment.baseUrl;
  private producturl= `${this.baseUrl}/product`;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.producturl,this.auth.getHeader());
  }

  getProduct(id: number): Observable<Product>{
    const url = `${this.producturl}/${id}`;
    return this.http.get<Product>(url, this.auth.getHeader());
  }

  updatePrice(product: Product, id:number): Observable<Product>{
    const url = `${this.producturl}/${id}`;
    return this.http.post<Product>(url, product, this.auth.getHeader());
  }

}
