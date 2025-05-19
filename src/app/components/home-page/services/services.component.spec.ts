import { type ComponentFixture, TestBed } from "@angular/core/testing"
import { ServicesComponent } from "./services.component"
import { NO_ERRORS_SCHEMA } from "@angular/core"

describe("ServicesComponent", () => {
  let component: ServicesComponent
  let fixture: ComponentFixture<ServicesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesComponent],
      schemas: [NO_ERRORS_SCHEMA], // Ignore child components
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should have 8 services", () => {
    expect(component.services.length).toEqual(8)
  })
})
