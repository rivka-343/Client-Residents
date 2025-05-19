import { type ComponentFixture, TestBed } from "@angular/core/testing"
import { ServiceCubeComponent } from "./service-cube.component"
import { MatIconModule } from "@angular/material/icon"
import { RouterTestingModule } from "@angular/router/testing"

describe("ServiceCubeComponent", () => {
  let component: ServiceCubeComponent
  let fixture: ComponentFixture<ServiceCubeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceCubeComponent],
      imports: [MatIconModule, RouterTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCubeComponent)
    component = fixture.componentInstance
    component.icon = "test_icon"
    component.title = "Test Title"
    component.link = "/test-link"
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should display the correct icon", () => {
    const iconElement = fixture.nativeElement.querySelector("mat-icon")
    expect(iconElement.textContent).toContain("test_icon")
  })

  it("should display the correct title", () => {
    const titleElement = fixture.nativeElement.querySelector(".service-title")
    expect(titleElement.textContent).toContain("Test Title")
  })

  it("should have the correct link", () => {
    const linkElement = fixture.nativeElement.querySelector("a")
    expect(linkElement.getAttribute("href")).toContain("/test-link")
  })
})
