import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-plongee-register',
  templateUrl: './plongee-register.component.html',
  styleUrls: ['./plongee-register.component.css']
})
export class PlongeeRegisterComponent {
user = {
  identifiant: '',
  motDePasse: '',
  nom: '',
  prenom: '',
  adresseMail: ''
};

  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.message = '';
    this.authService.register(this.user).subscribe({
      next: (res) => {
        // auto-login après inscription
        this.authService.login({
          identifiant: this.user.identifiant,
          motDePasse: this.user.motDePasse
        }).subscribe({
          next: () => this.router.navigate(['/plongée']),
          error: (err) => {
            const msg = err?.error?.message || err?.error || err?.message;
            this.message = msg || 'Connexion après inscription échouée';
          }
        });
      },
      error: (err) => {
        const msg = err?.error?.message || err?.error || err?.message;
        this.message = msg || 'Inscription échouée';
      }
    });
  }
}