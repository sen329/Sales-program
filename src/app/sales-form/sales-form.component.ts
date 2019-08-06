import { Component, OnInit,EventEmitter, Output, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
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

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.css']
})
export class SalesFormComponent implements OnInit {
  sales: Sales[];
  add: any = {};
  product: Product[];

  currentProduct: any ={};

  
  searchModel: string;


  @Output() public select: EventEmitter<{}> = new EventEmitter();
  
  // productCtrl: FormControl = new FormControl();

  // productFilterCtrl: FormControl = new FormControl();

  // filteredProducts: ReplaySubject<Product[]> = new ReplaySubject<Product[]>(1);

  // protected _onDestroy = new Subject<void>();

  // @ViewChild('singleSelect') singleSelect: MatSelect;
  
  constructor(
    private salesService: SalesService,
    private authService: AuthService, 
    private location: Location,
    private fb: FormBuilder) { }

    proposalForm: FormGroup;



  ngOnInit() {
    this.proposalForm = this.fb.group({
      CustomerName: [],
      CustomerAddress: [],
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
    this.getProduct();

  //   this.productCtrl.setValue(this.product[9]);
  //   this.filteredProducts.next(this.product.slice());

  //   this.productFilterCtrl.valueChanges
  //   .pipe(takeUntil(this._onDestroy))
  //   .subscribe(() => {
  //     this.filterProducts();
  //   })
  // }

  // ngAfterViewInit() {
  //   this.setInitialValue();
  // }

  // ngOnDestroy() {
  //   this._onDestroy.next();
  //   this._onDestroy.complete();
  // }

  // protected setInitialValue() {
  //   this.filteredProducts
  //     .pipe(take(1), takeUntil(this._onDestroy))
  //     .subscribe(() => {
  //       this.singleSelect.compareWith = (a: Product, b: Product) => a && b && a.id === b.id;
  //     });
  // }

  // protected filterProducts(){
  //   if(!this.product){
  //     return;
  //   }

  //   let search = this.productFilterCtrl.value;
  //   if(!search){
  //     this.filteredProducts.next
  //     (this.product.slice());
  //     return;
  //   } else{
  //     search = search.toLowerCase();
  //   }
  //   this.filteredProducts.next(
  //     this.product.filter(product => 
  //       product.name.toLowerCase().indexOf(search)>-1)
  //   );
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

  public onSelect(product: Product): void {
    this.currentProduct = product; 
    this.select.emit(product);
  }

}
