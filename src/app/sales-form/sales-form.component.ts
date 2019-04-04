import { Component, OnInit } from '@angular/core';
import { Sales } from '../sales';
import { SalesService } from '../sales.service';
import { AuthService } from '../auth.service';
import { Product } from 'app/product';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.css']
})
export class SalesFormComponent implements OnInit {
  sales: Sales[];
  add: any = {};
  ProjectClass = ['Non-Consumable', 'Consumable'];
  ThreeMonths = ['Yes','No'];
  product: Product[];
  constructor(private salesService: SalesService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getProduct();
  }
  addSales(): void {
    this.salesService.addSales(this.add)
    .subscribe(res => { 
      console.log(this.add);
      alert("Successfully added");
      window.location.reload();}
    ,err=> console.log(err.error) 
    );
  }
  getProduct(): void{
    this.salesService.getProduct()
    .subscribe(product => this.product = product);
  }
}
