import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import {  Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';

import { Sales } from './sales';
import { error } from 'util';


@Injectable()
export class SalesService {

  private salesurl= 'http://localhost:8000/api/salescreate';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

    addSales(sales: Sales): Observable<Sales>{
        return this.http.post<Sales>(this.salesurl, sales, this.auth.getHeader());
    }
}
