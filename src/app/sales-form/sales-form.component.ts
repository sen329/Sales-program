import { Component, OnInit } from '@angular/core';
import { Sales } from '../sales';
import { SalesService } from '../sales.service';
import { AuthService } from '../auth.service';
import { Product } from 'app/product';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.css']
})
export class SalesFormComponent implements OnInit {
  sales: Sales[];
  add: any = {};
  product: Product[];
  constructor(private salesService: SalesService,
    private authService: AuthService, private location: Location) { }

  ngOnInit() {
    this.getProduct();
  }
  addSales(): void {
    this.salesService.addSales(this.add)
    .subscribe(res => { 
      alert("Successfully added");
      this.goBack();}
    ,err=> console.log(err.error) 
    );
  }
  getProduct(): void{
    this.salesService.getProduct()
    .subscribe(product => this.product = product);
  }

  goBack(): void{
    this.location.back();
  }

}
