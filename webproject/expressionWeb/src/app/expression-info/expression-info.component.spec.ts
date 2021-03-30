import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionInfoComponent } from './expression-info.component';

describe('ExpressionInfoComponent', () => {
  let component: ExpressionInfoComponent;
  let fixture: ComponentFixture<ExpressionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressionInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
