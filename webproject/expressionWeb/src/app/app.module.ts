import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpressionAppComponent } from './expression-app/expression-app.component';
import { FormsModule } from '@angular/forms';
import { ExpressionInfoComponent } from './expression-info/expression-info.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormExpressionComponent } from './form-expression/form-expression.component'

@NgModule({
  declarations: [
    AppComponent,
    ExpressionAppComponent,
    ExpressionInfoComponent,
    FormExpressionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [
    // AppComponent
    ExpressionAppComponent
  ]
})
export class AppModule { }
