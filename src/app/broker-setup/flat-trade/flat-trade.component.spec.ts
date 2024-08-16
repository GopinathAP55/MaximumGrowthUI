import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatTradeComponent } from './flat-trade.component';

describe('FlatTradeComponent', () => {
  let component: FlatTradeComponent;
  let fixture: ComponentFixture<FlatTradeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlatTradeComponent]
    });
    fixture = TestBed.createComponent(FlatTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
