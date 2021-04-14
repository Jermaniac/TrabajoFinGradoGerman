import { Component, OnInit, ViewChild } from '@angular/core';
import { Expression } from '../expression';
import { ExpressionFormComponent } from '../expression-form/expression-form.component';
import { ExpressionsArray } from '../expressions-array';

@Component({
  selector: 'app-expression-app',
  templateUrl: './expression-app.component.html',
  styleUrls: ['./expression-app.component.css']
})
export class ExpressionAppComponent implements OnInit {

// TO DO

  // QUITAR DISGUST DE LA CNN
  // PONER GIF DE CARGA JS

  // Parent variable for store the result of the predictions, this variable will be passed to the other child components
  theExpressions :  ExpressionsArray = {
    expressions: []
  };

  @ViewChild(ExpressionFormComponent) child;  

  expressionsAvailable : boolean = false;

  urlCurrentImage : string = "";
  constructor() { }

  ngOnInit(): void {
  }

  // Since this component does not make the api call, this method is for getting the expressions from the child who makes the api call.
  receiveExpressions($event: ExpressionsArray){
    if ($event.expressions){
      this.theExpressions=$event;
      this.expressionsAvailable=true;
      this.urlCurrentImage=this.child.urlImage;
    }
  }

}
