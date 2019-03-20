import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {  Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';

import { Sales } from './sales';
import { error } from 'util';


@Injectable()
export class SalesService {

  private salesurl= 'http://localhost:8000/api/sales';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

    addSales(sales: Sales): Observable<Sales>{
        const url = `${this.salesurl}/create`;
        return this.http.post<Sales>(url, sales);
    }

    getSales(): Observable<Sales[]>{
      return this.http.get<Sales[]>(this.salesurl,this.auth.getHeader());
    }

    getSale(id: number): Observable<Sales> {
      const url = `${this.salesurl}/${id}`;
      return this.http.get<Sales>(url,this.auth.getHeader());
    }

}
