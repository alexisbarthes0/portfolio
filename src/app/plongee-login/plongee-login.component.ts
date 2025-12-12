import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-plongee-login',
  templateUrl: './plongee-login.component.html',
  styleUrls: ['./plongee-login.component.css']
})
export class PlongeeLoginComponent {
  error?: string;
  loading = false;

  form = this.fb.group({
    identifiant: ['', Validators.required],
    motDePasse: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

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
        this.router.navigate(['/plongée']);
      },
      error: (err) => {
        this.loading = false;
        const message = err?.error?.message || err?.error || err?.message;
        this.error = message || 'Échec de connexion';
      }
    });
  }
}