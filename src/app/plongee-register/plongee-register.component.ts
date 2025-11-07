import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: (res) => this.message = res.message,
      error: (err) => this.message = err.error
    });
  }
}