import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { HttpModule, JsonpModule } from '@angular/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { SalesFormComponent } from './sales-form/sales-form.component';
import { SalesService } from './sales.service';
import { ListofapprovalComponent } from './listofapproval/listofapproval.component';
import { ProjectdetailComponent } from './projectdetail/projectdetail.component';
import { NavComponent } from './nav/nav.component';
import { AuthGuardService } from './auth-guard.service';
import { ReportComponent } from './report/report.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';;
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SearchComponent } from './search/search.component';
import { ListFilterPipe } from './sales-form/list-filter.pipe';
import { MatListModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';



export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SalesFormComponent,
    ListofapprovalComponent,
    ProjectdetailComponent,
    NavComponent,
    ReportComponent,
    SearchComponent,
    ListFilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    JsonpModule,
    MatFormFieldModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatListModule,
    MatInputModule,
    NgSelectModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: [
          'localhost:4200/login',
          'localhost:4200/register']
      }
    }),
    NoopAnimationsModule
  ],
  providers: [
    AuthService,
    SalesService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
