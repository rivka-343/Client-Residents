import { Component, Input } from "@angular/core"
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'; // Import MatToolbarModule
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-service-cube",
  templateUrl: "./service-cube.component.html",
  styleUrls: ["./service-cube.component.css"],
  imports: [MatIconModule,RouterModule,MatFormFieldModule,MatInputModule,
    MatButtonModule,MatCardModule,MatToolbarModule,
    MatGridListModule],
})
export class ServiceCubeComponent {
  @Input() icon = ""
  @Input() title = ""
  @Input() link = ""
}
