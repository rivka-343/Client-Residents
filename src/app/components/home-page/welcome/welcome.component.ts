import { Component } from "@angular/core"
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'; // Import MatToolbarModule
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"],
  imports: [MatIconModule,MatFormFieldModule,MatInputModule,
    MatButtonModule,MatCardModule,MatToolbarModule,
    MatGridListModule],
})

export class WelcomeComponent {
  // Component logic can go here
}
