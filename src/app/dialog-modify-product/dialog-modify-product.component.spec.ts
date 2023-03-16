import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModifyProductComponent } from './dialog-modify-product.component';

describe('DialogModifyProductComponent', () => {
  let component: DialogModifyProductComponent;
  let fixture: ComponentFixture<DialogModifyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModifyProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogModifyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
