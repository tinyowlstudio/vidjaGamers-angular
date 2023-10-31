import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperDialogComponent } from './developer-dialog.component';

describe('DeveloperDialogComponent', () => {
  let component: DeveloperDialogComponent;
  let fixture: ComponentFixture<DeveloperDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeveloperDialogComponent]
    });
    fixture = TestBed.createComponent(DeveloperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
