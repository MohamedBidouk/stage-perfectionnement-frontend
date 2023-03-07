import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailledProductComponent } from './detailled-product.component';

describe('DetailledProductComponent', () => {
  let component: DetailledProductComponent;
  let fixture: ComponentFixture<DetailledProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailledProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailledProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
