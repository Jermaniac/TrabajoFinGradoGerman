import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Expression } from '../expression';

@Component({
  selector: 'app-expression-info',
  templateUrl: './expression-info.component.html',
  styleUrls: ['./expression-info.component.css'],
  animations : [
    trigger(
      "anime",
      [
        state("start",style(
          {
            width : "0%",
          }
        )),
        state("final", style(
          {
            width: "{{widthtest}}%",
          }
        ),
         {
           params: {widthtest: "50%"}
         }
        ), 
        transition("start => final",
        [
          animate("1s")
        ])
      ]
    )
  ]
})
export class ExpressionInfoComponent implements OnInit {

  @Input()
  expressions : Expression[] = [];

  animate : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  // When the photo changes, the probabilities resets
  ngOnChanges(){
    this.animate=true;
    setTimeout(() => {
      this.doAnimation();
    }, 1000);
  }
  
  doAnimation(){
      this.animate=!this.animate;
  }
  


}
