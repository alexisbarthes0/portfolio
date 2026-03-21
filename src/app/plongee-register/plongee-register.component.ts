import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-plongee-register',
  templateUrl: './plongee-register.component.html',
  styleUrls: ['./plongee-register.component.css']
})
export class PlongeeRegisterComponent {
  message = '';
  error?: string;
  loading = false;

  form = this.fb.group({
    identifiant: ['', Validators.required],
    motDePasse: ['', Validators.required],
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    adresseMail: ['', [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  onSubmit() {
    this.message = '';
    this.error = undefined;
    if (this.form.invalid) return;
    this.loading = true;
    const v = this.form.getRawValue();
    this.authService
      .register({
        identifiant: v.identifiant || '',
        motDePasse: v.motDePasse || '',
        nom: v.nom || '',
        prenom: v.prenom || '',
        adresseMail: v.adresseMail || ''
      })
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.message = res.message;
          this.form.reset();
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
      const errs = o['errors'];
      if (errs && typeof errs === 'object') {
        const first = Object.values(errs as Record<string, unknown[]>)[0];
        if (Array.isArray(first) && typeof first[0] === 'string') return first[0];
      }
    }
    if (typeof err?.message === 'string' && err.message.includes('Http failure'))
      return "Impossible de joindre l'API (vérifiez qu'ApiPlongee tourne sur le bon port).";
    return "L'inscription a échoué";
  }
}
