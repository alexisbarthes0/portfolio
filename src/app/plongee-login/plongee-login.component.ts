import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private auth: AuthService) {}

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
        // TODO: stocker le user/token et rediriger
        console.log('login ok', res);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error || 'Échec de connexion';
      }
    });
  }
}