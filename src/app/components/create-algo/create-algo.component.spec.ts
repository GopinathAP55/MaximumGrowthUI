import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlgoComponent } from './create-algo.component';

describe('CreateAlgoComponent', () => {
  let component: CreateAlgoComponent;
  let fixture: ComponentFixture<CreateAlgoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAlgoComponent]
    });
    fixture = TestBed.createComponent(CreateAlgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
