import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerSetupComponent } from './broker-setup.component';

describe('BrokerSetupComponent', () => {
  let component: BrokerSetupComponent;
  let fixture: ComponentFixture<BrokerSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrokerSetupComponent]
    });
    fixture = TestBed.createComponent(BrokerSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
