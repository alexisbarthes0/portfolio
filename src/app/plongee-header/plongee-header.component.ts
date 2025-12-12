import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-plongee-header',
  templateUrl: './plongee-header.component.html',
  styleUrls: ['./plongee-header.component.css']
})
export class PlongeeHeaderComponent {
  isLoggedIn = false;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.currentUser$.subscribe(user => this.isLoggedIn = !!user);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/plongée']);
  }
}
