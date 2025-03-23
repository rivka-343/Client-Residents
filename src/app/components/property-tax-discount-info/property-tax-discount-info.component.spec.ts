import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTaxDiscountInfoComponent } from './property-tax-discount-info.component';

describe('PropertyTaxDiscountInfoComponent', () => {
  let component: PropertyTaxDiscountInfoComponent;
  let fixture: ComponentFixture<PropertyTaxDiscountInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyTaxDiscountInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyTaxDiscountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
