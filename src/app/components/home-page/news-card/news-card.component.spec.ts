import { type ComponentFixture, TestBed } from "@angular/core/testing"
import { NewsCardComponent } from "./news-card.component"
import { MatCardModule } from "@angular/material/card"

describe("NewsCardComponent", () => {
  let component: NewsCardComponent
  let fixture: ComponentFixture<NewsCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsCardComponent],
      imports: [MatCardModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCardComponent)
    component = fixture.componentInstance
    component.title = "Test Title"
    component.summary = "Test Summary"
    component.date = "01.01.2025"
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should display the correct title", () => {
    const titleElement = fixture.nativeElement.querySelector(".news-card-title")
    expect(titleElement.textContent).toContain("Test Title")
  })

  it("should display the correct summary", () => {
    const summaryElement = fixture.nativeElement.querySelector(".news-summary")
    expect(summaryElement.textContent).toContain("Test Summary")
  })

  it("should display the correct date", () => {
    const dateElement = fixture.nativeElement.querySelector(".news-date")
    expect(dateElement.textContent).toContain("01.01.2025")
  })
})
