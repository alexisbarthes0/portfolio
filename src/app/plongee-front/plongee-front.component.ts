import { Component, OnInit } from '@angular/core';
import { PlongeeService, Plongee } from '../plongee.service';
import { PlongeeSessionService } from '../plongee-session.service';

@Component({
  selector: 'app-plongee-front',
  templateUrl: './plongee-front.component.html',
  styleUrls: ['./plongee-front.component.css']
})
export class PlongeeFrontComponent implements OnInit {
  plongees: Plongee[] = [];
  loadError?: string;
  loading = true;

  constructor(
    private plongeeService: PlongeeService,
    private session: PlongeeSessionService
  ) {}

  ngOnInit(): void {
    const user = this.session.getUser();
    if (!user?.id) {
      this.loading = false;
      return;
    }
    this.plongeeService.listByUser(user.id).subscribe({
      next: (list) => {
        this.plongees = list;
        this.loading = false;
      },
      error: () => {
        this.loadError = 'Impossible de charger les plongées.';
        this.loading = false;
      }
    });
  }
}
