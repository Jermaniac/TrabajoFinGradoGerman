import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionAppComponent } from './expression-app.component';

describe('ExpressionAppComponent', () => {
  let component: ExpressionAppComponent;
  let fixture: ComponentFixture<ExpressionAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressionAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
