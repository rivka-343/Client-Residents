import { Component, Input } from "@angular/core"
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'; // Import MatToolbarModule
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: "app-news-card",
  templateUrl: "./news-card.component.html",
  styleUrls: ["./news-card.component.css"],
  imports: [MatIconModule,MatFormFieldModule,MatInputModule,
    MatButtonModule,MatCardModule,MatToolbarModule,
    MatGridListModule],
})
export class NewsCardComponent {
  @Input() title = ""
  @Input() summary = ""
  @Input() date = ""
}
