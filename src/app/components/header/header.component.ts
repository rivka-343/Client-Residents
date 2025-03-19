import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'; // Import MatToolbarModule
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatFormFieldModule,RouterLink,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public authService: AuthService) { }

  onLogout(): boolean {
  return  this.authService.isLoggedIn();
  }
}
