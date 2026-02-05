import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAdmin = localStorage.getItem('isAdminAuthenticated') === 'true';

    if (!isAdmin) {
      this.router.navigate(['/admin']);
      return false;
    }

    return true;
  }
}


