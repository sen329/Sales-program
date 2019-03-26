import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Sales } from '../sales';
import { SalesService } from '../sales.service';
import { Accepted } from '../accepted';
import { ACCEPTED } from '../acceptedList';



@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.component.html',
  styleUrls: ['./projectdetail.component.css']
})
export class ProjectdetailComponent implements OnInit {
  add: any = {};
  sales: Sales;
  AcceptedList: Accepted[] = ACCEPTED;
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

  approveSale(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.salesService.approveSale(this.add,id)
    .subscribe(res => {
      alert('Data recieved');
      this.goBack();
  },
    err=>{
      let error = err.error;
      console.log(this.add);
      alert(error);
      console.error;
    });
  } 

  goBack(): void{
    this.location.back();
  }

}
