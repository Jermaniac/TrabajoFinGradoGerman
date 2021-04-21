import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExpressionManagementService } from '../../services/expression-management.service';
import { ExpressionsArray } from '../expressions-array';

// url of the blank photo png
const blankphotoPath = './assets/images/blankPhoto.png';
@Component({
  selector: 'app-expression-form',
  templateUrl: './expression-form.component.html',
  styleUrls: ['./expression-form.component.css']
})
export class ExpressionFormComponent implements OnInit {


  // An EventEmitter with @Output anotation is required to share the expressions to the parent component from the api call
  @Output() expressionEvent = new EventEmitter <ExpressionsArray>();

  // Image url for preview
  // Input to get the previous url
  @Input() urlImage : string = "";

  // Image container
  // Input to get the previous photoToPredict
  @Input() photoToPredict : File = null;

  // trigger for loading spinner
  startLoading : boolean = false;

  // Calling the service for making request
  constructor(
    public serviceExpressions : ExpressionManagementService
  ) { }

  ngOnInit(): void {
    // if not image selected for preview, blank photo will be shown
    if (!this.urlImage) {
      this.urlImage = blankphotoPath;
    }
  }

  previewPhoto ($event) {
    // Get the photo file from the form
    let fileList : FileList = $event.target.files;
    this.photoToPredict = fileList[0];

    if (this.photoToPredict){
      // Show photo preview
      var reader = new FileReader();
      reader.readAsDataURL(this.photoToPredict);
      reader.onload=(event:any)=>{
        this.urlImage=event.target.result;
      }
    }
    else {
      alert("Please, select one image.");
      this.urlImage = blankphotoPath;
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
