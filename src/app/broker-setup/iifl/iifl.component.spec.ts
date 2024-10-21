import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IiflComponent } from './iifl.component';

describe('IiflComponent', () => {
  let component: IiflComponent;
  let fixture: ComponentFixture<IiflComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IiflComponent]
    });
    fixture = TestBed.createComponent(IiflComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
