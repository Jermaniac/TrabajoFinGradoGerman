import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExpressionComponent } from './form-expression.component';

describe('FormExpressionComponent', () => {
  let component: FormExpressionComponent;
  let fixture: ComponentFixture<FormExpressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormExpressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormExpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
