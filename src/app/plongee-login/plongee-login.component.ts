import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PlongeeSessionService } from '../plongee-session.service';

@Component({
  selector: 'app-plongee-login',
  templateUrl: './plongee-login.component.html',
  styleUrls: ['./plongee-login.component.css', '../plongee-register/plongee-register.component.css']
})
export class PlongeeLoginComponent {
  error?: string;
  loading = false;

  form = this.fb.group({
    identifiant: ['', Validators.required],
    motDePasse: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private session: PlongeeSessionService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = undefined;
    this.auth.login({
      identifiant: this.form.value.identifiant || '',
      motDePasse: this.form.value.motDePasse || ''
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.session.setUser({
          id: res.user.id,
          identifiant: res.user.identifiant,
          nom: res.user.nom,
          prenom: res.user.prenom
        });
        this.router.navigate(['/plongée']);
      },
      error: (err) => {
        this.loading = false;
        this.error = this.formatError(err);
      }
    });
  }

  private formatError(err: { error?: unknown; message?: string }): string {
    const e = err?.error;
    if (typeof e === 'string') return e;
    if (e && typeof e === 'object') {
      const o = e as Record<string, unknown>;
      if (typeof o['detail'] === 'string') return o['detail'];
      if (typeof o['title'] === 'string') return o['title'];
      if (typeof o['message'] === 'string') return o['message'];
    }
    if (typeof err?.message === 'string' && err.message.includes('Http failure'))
      return "Impossible de joindre l'API (vérifiez qu'ApiPlongee tourne).";
    return 'Échec de connexion';
  }
}