import { Component, OnInit } from '@angular/core';
import { Sales, ModSales } from '../sales';
import { SalesService } from '../sales.service';
import { AuthService } from '../auth.service';
import { Product } from 'app/product';
import { Location } from '@angular/common';
import { Order } from 'app/sales';
import { FormBuilder, FormGroup, FormArray, FormControl, Form } from '@angular/forms';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.css']
})
export class SalesFormComponent implements OnInit {
  sales: Sales[];
  add: any = {};
  product: Product[];
  constructor(
    private salesService: SalesService,
    private authService: AuthService, 
    private location: Location,
    private fb: FormBuilder) { }

    proposalForm: FormGroup;

  ngOnInit() {
    this.proposalForm = this.fb.group({
      SalesName: [],
      CustomerName: [],
      CustomerAddress: [],
      CustomerContact:[],
      orders: this.fb.array([
        this.fb.group({
          product_id:[],
          ProposedPrice:[],
          Quantity:[],
      })])
    })
    this.getProduct();
  }

  get orders(){
    return this.proposalForm.get('orders') as FormArray;
  }

  addOrder(){
    this.orders.push(this.fb.group({
      product_id:[],
      ProposedPrice:[],
      Quantity:[],
  }));
  }

  deleteOrder(index){
    this.orders.removeAt(index);
  }


  addSales(): void {
    let transform ={
      CustomerAddress: this.proposalForm.value.CustomerAddress,
      CustomerContact: this.proposalForm.value.CustomerContact,
      CustomerName: this.proposalForm.value.CustomerName,
      SalesName: this.proposalForm.value.SalesName,
      Accepted: null,
      ProposedPrice: [],
      Quantity: [],
      product_id: [],
    };
    
    for(let i=0;i<this.proposalForm.value.orders.length;i++){
      transform.Quantity.push(this.proposalForm.value.orders[i].Quantity);
      transform.ProposedPrice.push(this.proposalForm.value.orders[i].ProposedPrice);
      transform.product_id.push(this.proposalForm.value.orders[i].product_id);
    }

    this.salesService.addSales(transform)
    .subscribe(res => { 
      alert("Successfully added");
      this.goBack();}
    ,err=> console.log(err.error, transform)
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
