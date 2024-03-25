import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  return authService.userSubject.pipe(take(1), map((user) => {
    return user ? true : router.createUrlTree(['/auth'])
  }))
};