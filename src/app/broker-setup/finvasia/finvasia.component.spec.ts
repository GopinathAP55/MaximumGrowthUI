import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinvasiaComponent } from './finvasia.component';

describe('FinvasiaComponent', () => {
  let component: FinvasiaComponent;
  let fixture: ComponentFixture<FinvasiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinvasiaComponent]
    });
    fixture = TestBed.createComponent(FinvasiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
