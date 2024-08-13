import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcAgarwalComponent } from './ac-agarwal.component';

describe('AcAgarwalComponent', () => {
  let component: AcAgarwalComponent;
  let fixture: ComponentFixture<AcAgarwalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcAgarwalComponent]
    });
    fixture = TestBed.createComponent(AcAgarwalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
