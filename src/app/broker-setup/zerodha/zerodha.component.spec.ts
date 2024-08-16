import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZerodhaComponent } from './zerodha.component';

describe('ZerodhaComponent', () => {
  let component: ZerodhaComponent;
  let fixture: ComponentFixture<ZerodhaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZerodhaComponent]
    });
    fixture = TestBed.createComponent(ZerodhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
