import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';
import { JwtModule } from '@auth0/angular-jwt';

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
import { NavComponent } from './nav/nav.component';
import { AuthGuardService } from './auth-guard.service';
import { SalesFormDetailsComponent } from './sales-form-details/sales-form-details.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TestComponentComponent,
    SalesFormComponent,
    ListofapprovalComponent,
    ProjectdetailComponent,
    NavComponent,
    SalesFormDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    JsonpModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: [
          'localhost:4200/login',
          'localhost:4200/register']
      }
    })
  ],
  providers: [
    AuthService,
    SalesService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
