import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExpressionManagementService } from '../expression-management.service';
import { ExpressionsArray } from '../expressions-array';

@Component({
  selector: 'app-form-expression',
  templateUrl: './form-expression.component.html',
  styleUrls: ['./form-expression.component.css']
})
export class FormExpressionComponent implements OnInit {

  // An EventEmitter with @Output anotation is required to share the expressions to the parent component from the api call
  @Output() expressionEvent = new EventEmitter <ExpressionsArray>();

  // Image url for preview
  urlImage : string = "";

  // Image container
  photoToPredict : File = null;

  // Calling the service for making request
  constructor(
    public serviceExpressions : ExpressionManagementService
  ) { }

  ngOnInit(): void {
  }

  getExpressions ($event) {
    // Get the photo file from the form
    let fileList : FileList = $event.target.files;
    this.photoToPredict = fileList[0];

    // Show photo preview
    var reader = new FileReader();
    reader.readAsDataURL(this.photoToPredict);
    reader.onload=(event:any)=>{
      this.urlImage=event.target.result;
    }

    // Call API for getting the prediction
    this.serviceExpressions.getPrediction(this.photoToPredict).subscribe(
      (data:ExpressionsArray) => {
        console.log("Getting mood from API ...");
        this.expressionEvent.emit(data);
      },
      (respuestaKo) => {
        console.log("Call API failed");
      }
    );

  }

}
