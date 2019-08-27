import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Sales } from '../sales';
import { SalesService } from '../sales.service';
import { Accepted } from '../accepted';
import { ACCEPTED } from '../acceptedList';
import { Proposal } from '../proposal';
import { Order } from '../sales';
import { Winlose } from 'app/winlose';
import { WINLOSE } from 'app/winlose-list';
import { ArrWinlose } from 'app/arr-winlose';



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
  orders: Order[];
  Winlose: Winlose[] = WINLOSE;
  order: Order;
  arrWinlose: ArrWinlose;
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

  setStatus(){
    let arr={
      ids: [],
      Status:[],

    }
    for(let i=0;i<this.orders.length;i++){
      arr.ids.push(this.orders[i].id);
      arr.Status.push(Number(this.orders[i].Status));
    }

    this.salesService.setStatus(arr)
    .subscribe(res => {
      alert('Data recieved');
      this.goBack();
  },
    err=>{
      let error = err.error;
      alert(error);
      console.log(err.error, this.orders.length);
    });
  } 

  headElements = ['Product Code', 'Product', 'Proposed Price', 'Quantity', 'Status','Recommended Price','Keterangan','Status'];

}
