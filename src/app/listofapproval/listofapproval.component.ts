import { Component, OnInit } from '@angular/core';
import { Sales } from '../sales';
import { SalesService } from '../sales.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listofapproval',
  templateUrl: './listofapproval.component.html',
  styleUrls: ['./listofapproval.component.css']
})
export class ListofapprovalComponent implements OnInit {
  
  sales: Sales[];

  constructor(private salesService: SalesService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getSales()
  }

  getSales(): void {
    const id = localStorage.getItem('id');
    this.salesService.getSales(id)
    .subscribe(sales => this.sales = sales);
  }

  headElements = ['Request', 'Status'];
}
