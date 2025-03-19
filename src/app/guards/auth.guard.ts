import { CanActivate, CanActivateFn,Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    alert('עליך להתחבר כדי להגיש בקשה.');
    return router.navigate(['/not-login']);
  }
};