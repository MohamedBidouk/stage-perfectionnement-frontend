import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModifyUserComponent } from './dialog-modify-user.component';

describe('DialogModifyUserComponent', () => {
  let component: DialogModifyUserComponent;
  let fixture: ComponentFixture<DialogModifyUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModifyUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogModifyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
