import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotLoginComponent } from './not-login.component';

describe('NotLoginComponent', () => {
  let component: NotLoginComponent;
  let fixture: ComponentFixture<NotLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
