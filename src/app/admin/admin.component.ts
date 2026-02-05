import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from './admin-auth.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  error?: string;
  loading = false;

  form = this.fb.group({
    identifiant: ['', Validators.required],
    motDePasse: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private adminAuth: AdminAuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = undefined;
    this.adminAuth.login({
      login: this.form.value.identifiant || '',
      password: this.form.value.motDePasse || ''
    }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res && res.success) {
          localStorage.setItem('isAdminAuthenticated', 'true');
          this.router.navigate(['/admin-portal']);
        } else {
          this.error = 'Échec de connexion';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error || 'Échec de connexion';
      }
    });
  }
}