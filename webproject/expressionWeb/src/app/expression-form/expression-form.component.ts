import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExpressionManagementService } from '../expression-management.service';
import { ExpressionsArray } from '../expressions-array';
@Component({
  selector: 'app-expression-form',
  templateUrl: './expression-form.component.html',
  styleUrls: ['./expression-form.component.css']
})
export class ExpressionFormComponent implements OnInit {


  // An EventEmitter with @Output anotation is required to share the expressions to the parent component from the api call
  @Output() expressionEvent = new EventEmitter <ExpressionsArray>();

  // Image url for preview
  @Input() urlImage : string = "";

  // Image container
  photoToPredict : File = null;

  startLoading : boolean = false;
  // Calling the service for making request
  constructor(
    public serviceExpressions : ExpressionManagementService
  ) { }

  ngOnInit(): void {
    if (!this.urlImage) {
      this.urlImage = "./assets/blankPhoto.png";
    }
  }

  previewPhoto ($event) {
    // Get the photo file from the form
    let fileList : FileList = $event.target.files;
    this.photoToPredict = fileList[0];

    // Show photo preview
    var reader = new FileReader();
    reader.readAsDataURL(this.photoToPredict);
    reader.onload=(event:any)=>{
      this.urlImage=event.target.result;
    }
  }

  requestPredict (){
    if(this.photoToPredict){
      this.startLoading=true;
       // Call API for getting the prediction
       this.serviceExpressions.getPrediction(this.photoToPredict).subscribe(
        (data:ExpressionsArray) => {
          console.log("Getting mood from API ...");
          this.expressionEvent.emit(data);
        },
        (error) => {
          console.log("Call API failed");
          console.log(error);
          this.startLoading=false;
        },
        () => {
          console.log("Success!")
          this.startLoading=false;
        }
      );
    }
    else{
      alert("Please, select a photo.")
    }
  }

}
