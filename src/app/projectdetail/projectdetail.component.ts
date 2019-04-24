import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Sales } from '../sales';
import { SalesService } from '../sales.service';
import { Accepted } from '../accepted';
import { ACCEPTED } from '../acceptedList';
import { Proposal } from '../proposal';
import { Order } from '../sales';



@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.component.html',
  styleUrls: ['./projectdetail.component.css']
})
export class ProjectdetailComponent implements OnInit {
  add: any = {};
  sales: Sales;
  AcceptedList: Accepted[] = ACCEPTED;
  proposal: Proposal;
  orders: Order;
  constructor(
    private route: ActivatedRoute,
    private salesService: SalesService,
    private location: Location
  ) { }
  
  ngOnInit() {
    this.getProposal();
    this.getOrders();
  }

  getProposal(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.salesService.getProposal(id)
      .subscribe(proposal => {
        this.proposal = proposal;
      },
      err => console.log(err.error)
      );
  }

  goBack(): void{
    this.location.back();
  }

  getOrders(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.salesService.getOrderDetail(id)
    .subscribe(order => {
      this.orders = order;
    }, err=> console.log(err.error))
  }

  headElements = ['Product', 'Product Code', 'Proposed Price', 'Quantity', 'Status'];

}
