import { Component, OnInit,EventEmitter, Output, Input } from '@angular/core';
import { Sales, ModSales } from '../sales';
import { SalesService } from '../sales.service';
import { AuthService } from '../auth.service';
import { Product } from 'app/product';
import { Location } from '@angular/common';
import { Order } from 'app/sales';
import { FormBuilder, FormGroup, FormArray, FormControl, Form } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.css']
})
export class SalesFormComponent implements OnInit {
  sales: Sales[];
  add: any = {};
  product: Product[];

  products = [];
  allProducts = [];

  currentProduct: any ={};

  
  @Input() searchModelForm;
  

  @Output() searchModelChange: EventEmitter<any> = new EventEmitter();
  
  constructor(
    private salesService: SalesService,
    private authService: AuthService, 
    private location: Location,
    private fb: FormBuilder) { }

    proposalForm: FormGroup;



  ngOnInit() {
    this.loadProducts();
    this.proposalForm = this.fb.group({
      CustomerName: [],
      CustomerAddress: [],
      Postcode: [],
      CustomerContact:[],
      ContactPerson: [],
      warehouse: [],
      nolang: [],
      orders: this.fb.array([
        this.fb.group({
          product_id:[],
          ProposedPrice:[],
          Quantity:[],
      })])
    })
    // this.getProduct();

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
      Postcode: this.proposalForm.value.Postcode,
      CustomerContact: this.proposalForm.value.CustomerContact,
      CustomerName: this.proposalForm.value.CustomerName,
      ContactPerson: this.proposalForm.value.ContactPerson,
      branch: this.proposalForm.value.branch,
      warehouse: this.proposalForm.value.warehouse,
      nolang: this.proposalForm.value.nolang,
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
      //console.log(transform);
      this.goBack();
    }
    ,err=>console.log("Failed", err.error)
    );
  }
  getProduct(): void{
    this.salesService.getProduct()
    .subscribe(product => this.product = product);
  }

  goBack(): void{
    this.location.back();
  }

  updateSearchModel(value) {
    this.searchModelForm = value;
    this.searchModelChange.emit(this.searchModelForm);
  }

  clear(input: HTMLInputElement){
      input.value='';
  }

  private loadProducts(){
    this.salesService.getProductList().pipe(delay(500))
    .subscribe(products => {
      this.allProducts = products;
      this.products = [...this.allProducts];
    })
  }

}
