import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Sales } from '../sales';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.component.html',
  styleUrls: ['./projectdetail.component.css']
})
export class ProjectdetailComponent implements OnInit {

  sales: Sales;

  constructor(
    private route: ActivatedRoute,
    private salesService: SalesService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getSale();
  }

  getSale(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.salesService.getSale(id)
      .subscribe(sales => {
        this.sales = sales;
      },
      err => console.log(err.error)
      );
  }

  goBack(): void{
    this.location.back();
  }

}
