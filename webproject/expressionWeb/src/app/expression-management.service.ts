import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ExpressionManagementService {

  // proxy enabled
  // readonly url : string = "/getMood";

  // json-server
  // readonly url : string = "http://localhost:3000/expressions";

  // AWS
  // readonly url : string = "http://ec2-18-207-238-101.compute-1.amazonaws.com:9004/getMood";

  readonly url : string = "http://ec2-18-207-238-101.compute-1.amazonaws.com:9004/getMood";
  // No options required
  // readonly options = {
  //   headers: new HttpHeaders (
  //     {
  //       "Content-Type": "image/jpeg"
  //     }
  //   )
  // }

  // Import HttpClient
  constructor(
    private httpClient : HttpClient
  ) { }

  getPrediction (photo : File) {
    // Transform the file type to a formdata, the associated name is "photo"
    let photoForm = new FormData();
    photoForm.append("photo",photo);
    return this.httpClient.post(
      this.url,
      photoForm
    );
  }

}
