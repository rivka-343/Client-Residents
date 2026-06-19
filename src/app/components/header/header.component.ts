import { Component ,HostListener} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'; // Import MatToolbarModule
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
// import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [MatFormFieldModule,RouterLink,CommonModule,RouterModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,MatIcon,
    MatToolbarModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isScrolled = false
  isMobileMenuOpen = false
  navLinks = [
    { title: "התחבר", path: "/login" },
    { title: "הרשם", path: "/register" },
    { title: "דף הבית", path: "/home" },
  ]
  constructor(public authService: AuthService) { }

  onLogout(): boolean {
  return  this.authService.isLoggedIn();
  }
  @HostListener("window:scroll")
  onWindowScroll() {
    // שינוי מראה התפריט בעת גלילה
    // this.isScrolled = window.scrollY > 50
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }
}
