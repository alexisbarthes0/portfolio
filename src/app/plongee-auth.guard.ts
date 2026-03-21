import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { PlongeeSessionService } from './plongee-session.service';

@Injectable({
  providedIn: 'root'
})
export class PlongeeAuthGuard implements CanActivate {
  constructor(
    private session: PlongeeSessionService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    if (this.session.isLoggedIn()) {
      return true;
    }
    return this.router.createUrlTree(['/plongée-login']);
  }
}
