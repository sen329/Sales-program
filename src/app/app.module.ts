import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { SalesFormComponent } from './sales-form/sales-form.component';
import { SalesService } from './sales.service';
import { ListofapprovalComponent } from './listofapproval/listofapproval.component';
import { ProjectdetailComponent } from './projectdetail/projectdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TestComponentComponent,
    SalesFormComponent,
    ListofapprovalComponent,
    ProjectdetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    JsonpModule,
  ],
  providers: [
    AuthService,
    SalesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
