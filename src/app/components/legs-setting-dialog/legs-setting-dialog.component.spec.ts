import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegsSettingDialogComponent } from './legs-setting-dialog.component';

describe('LegsSettingDialogComponent', () => {
  let component: LegsSettingDialogComponent;
  let fixture: ComponentFixture<LegsSettingDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LegsSettingDialogComponent]
    });
    fixture = TestBed.createComponent(LegsSettingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
