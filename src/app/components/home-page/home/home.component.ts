import { Component } from "@angular/core"

@Component({
  selector: "app-home",
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  currentYear = new Date().getFullYear()
}
