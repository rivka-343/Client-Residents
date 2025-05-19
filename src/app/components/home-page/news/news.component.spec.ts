import { type ComponentFixture, TestBed } from "@angular/core/testing"
import { NewsComponent } from "./news.component"
import { NO_ERRORS_SCHEMA } from "@angular/core"

describe("NewsComponent", () => {
  let component: NewsComponent
  let fixture: ComponentFixture<NewsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsComponent],
      schemas: [NO_ERRORS_SCHEMA], // Ignore child components
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should have 3 news items", () => {
    expect(component.newsItems.length).toEqual(3)
  })
})
