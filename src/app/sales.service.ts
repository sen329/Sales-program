import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {  Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';

import { Sales } from './sales';
import { error } from 'util';
import { Product } from './product';
import { Proposal } from './proposal';
import { ModSales } from './sales';
import { Order } from './sales';
import { environment } from '../environments/environment';


@Injectable()
export class SalesService {

  baseUrl = environment.baseUrl;
  private salesurl= `${this.baseUrl}/sales`;
  private producturl= `${this.baseUrl}/product`;
  private proposalurl= `${this.baseUrl}/proposal`;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }
    
    addSales(sales: ModSales): Observable<Sales>{
        const url = `${this.salesurl}/create`;
        return this.http.post<Sales>(url, sales, this.auth.getHeader());
    }

    getSales(id:string): Observable<Sales[]>{
      const url = `${this.salesurl}/mysales/${id}`;
      return this.http.get<Sales[]>(url,this.auth.getHeader());
    }

    getSale(id: number): Observable<Sales> {
      const url = `${this.salesurl}/detail/${id}`;
      return this.http.get<Sales>(url,this.auth.getHeader());
    }

    approveSale(sales: Sales, id: number): Observable<Sales> {
      const url = `${this.salesurl}/${id}`;
      return this.http.post<Sales>(url, sales, this.auth.getHeader());
    }

    getProduct(): Observable<Product[]>{
      return this.http.get<Product[]>(this.producturl,this.auth.getHeader());
    }
    getProposal(id:number): Observable<Proposal>{
      const url = `${this.proposalurl}/${id}`;
      return this.http.get<Proposal>(url,this.auth.getHeader());
    }

    getOrderDetail(sales_id:number): Observable<Order>{
      const url = `${this.salesurl}/order/${sales_id}`;
      return this.http.get<Order>(url, this.auth.getHeader());
    }    
}
