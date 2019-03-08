import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { RegisterComponent } from './register/register.component';
import { SalesFormComponent } from './sales-form/sales-form.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestComponentComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'sales', component: SalesFormComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}