import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.interface';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const lastPath = localStorage.getItem('lastPath');
  if (!lastPath) return true;

  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigateByUrl(lastPath);
    return false;
  }
  return true;
};