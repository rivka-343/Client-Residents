import { type ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroComponent } from "./hero.component"

describe("HeroComponent", () => {
  let component: HeroComponent
  let fixture: ComponentFixture<HeroComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should have the correct background image URL", () => {
    expect(component.backgroundImage).toEqual(
      "https://www.harish.muni.il/wp-content/uploads/2022/07/landscape_harish_1-scaled.jpg",
    )
  })
})
