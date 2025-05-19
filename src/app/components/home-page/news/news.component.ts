import { Component } from "@angular/core"
import { NewsCardComponent } from "../news-card/news-card.component";

interface NewsItem {
  title: string
  summary: string
  date: string
}

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
  imports: [NewsCardComponent],
})
export class NewsComponent {
  newsItems: NewsItem[] = [
    {
      title: "מרכז חדשנות עירוני נפתח בחריש",
      summary: "המרכז החדש יציע לתושבים מגוון פעילויות טכנולוגיות וחדשניות",
      date: "15.05.2025",
    },
    {
      title: "שדרוג תשתיות בשכונות הצפוניות",
      summary: "העירייה החלה בפרויקט שדרוג תשתיות מקיף שיימשך כחודשיים",
      date: "10.05.2025",
    },
    {
      title: "מבצע חיסונים עירוני יוצא לדרך",
      summary: "מבצע חיסונים מיוחד יתקיים בשבוע הבא במתחם העירייה",
      date: "05.05.2025",
    },
  ]
}
