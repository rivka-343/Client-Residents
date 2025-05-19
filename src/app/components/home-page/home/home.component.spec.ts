import { type ComponentFixture, TestBed } from "@angular/core/testing"
import { HomeComponent } from "./home.component"
import { NO_ERRORS_SCHEMA } from "@angular/core"

describe("HomeComponent", () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA], // Ignore child components
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should set currentYear to the current year", () => {
    expect(component.currentYear).toEqual(new Date().getFullYear())
  })
})
