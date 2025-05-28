import { Component } from "@angular/core"
import { HeroComponent } from "../hero/hero.component";
import { WelcomeComponent } from "../welcome/welcome.component";
import { ServicesComponent } from "../services/services.component";
import { NewsComponent } from "../news/news.component";
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  imports: [HeroComponent, WelcomeComponent, ServicesComponent, FooterComponent],
})
export class HomeComponent {
  currentYear = new Date().getFullYear()
}
