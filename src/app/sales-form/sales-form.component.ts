import { Component, OnInit } from '@angular/core';
import { Sales } from '../sales';
import { SalesService } from '../sales.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.css']
})
export class SalesFormComponent implements OnInit {
  sales: Sales[];
  add: any = {};
  ProjectClass = ['Non-Consummable', 'Consummable'];
  ThreeMonths = ['Yes','No'];
  constructor(private salesService: SalesService,
    private authService: AuthService) { }

  ngOnInit() {
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
}
