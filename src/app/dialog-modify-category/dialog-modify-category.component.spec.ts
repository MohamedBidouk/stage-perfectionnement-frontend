import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModifyCategoryComponent } from './dialog-modify-category.component';

describe('DialogModifyCategoryComponent', () => {
  let component: DialogModifyCategoryComponent;
  let fixture: ComponentFixture<DialogModifyCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModifyCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogModifyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
