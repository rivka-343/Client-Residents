import { Component } from "@angular/core"
import { ServiceCubeComponent } from "../service-cube/service-cube.component";

interface ServiceItem {
  icon: string
  title: string
  link: string
}

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.css"],
  imports: [ServiceCubeComponent],
})
export class ServicesComponent {
  services: ServiceItem[] = [
    { icon: "money_off", title: "הנחה בארנונה", link: "/application" },
    { icon: "school", title: "רישום למוסדות חינוך", link: "/education" },
    { icon: "directions_car", title: "דוחות חנייה", link: "/parking" },
    { icon: "account_balance", title: "תשלום ארנונה", link: "/payment" },
    { icon: "child_care", title: "רישום לגני ילדים", link: "/kindergarten" },
    { icon: "lightbulb", title: "מרכז חדשנות עירוני", link: "/innovation" },
    { icon: "construction", title: "שדרוג תשתיות", link: "/infrastructure" },
    { icon: "health_and_safety", title: "מבצע חיסונים", link: "/vaccination" },
  ]
}
