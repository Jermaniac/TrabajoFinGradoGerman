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
  // DIRECTIVA HIGHLIGHT

  // Parent variable for store the result of the predictions, this variable will be passed to the other child components
  theExpressions :  ExpressionsArray;

  // FormComponent child variable, it is used to get the url of the image AND the photo file to be predicted
  @ViewChild(ExpressionFormComponent) child;

  constructor() { }

  ngOnInit(): void {
  }

  // Since this component does not make the api call, this method is for getting the expressions from the child who makes the api call.
  receiveExpressions($event: ExpressionsArray){
    if ($event){
      this.theExpressions=$event;
    }
  }

}
