import { type ComponentFixture, TestBed } from "@angular/core/testing"
import { WelcomeComponent } from "./welcome.component"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"

describe("WelcomeComponent", () => {
  let component: WelcomeComponent
  let fixture: ComponentFixture<WelcomeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      imports: [MatCardModule, MatButtonModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
