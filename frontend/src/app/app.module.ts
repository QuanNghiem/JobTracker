import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SummaryComponent } from './Dashboard/summary/summary.component';
import { AddFormComponent } from './Dashboard/add-form/add-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './Dashboard/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { HttpinterceptorService } from './service/interceptor/httpinterceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    AddFormComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
