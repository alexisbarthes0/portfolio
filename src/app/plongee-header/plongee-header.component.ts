import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlongeeSessionService } from '../plongee-session.service';

@Component({
  selector: 'app-plongee-header',
  templateUrl: './plongee-header.component.html',
  styleUrls: ['./plongee-header.component.css']
})
export class PlongeeHeaderComponent {
  constructor(
    public session: PlongeeSessionService,
    private router: Router
  ) {}

  logout(): void {
    this.session.clear();
    this.router.navigate(['/plongée-login']);
  }
}
