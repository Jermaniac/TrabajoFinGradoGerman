import { state, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Expression } from '../expression';

@Component({
  selector: 'app-expression-info',
  templateUrl: './expression-info.component.html',
  styleUrls: ['./expression-info.component.css'],
  animations : [
    // TO DO
  ]
})
export class ExpressionInfoComponent implements OnInit {

  @Input()
  expressions : Expression[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
