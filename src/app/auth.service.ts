import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface RegisterRequest {
  identifiant: string;
  motDePasse: string;
  nom: string;
  prenom: string;
  adresseMail: string;
}

export interface LoginRequest {
  identifiant: string;
  motDePasse: string;
}

export interface LoginResponseUser {
  id: string;
  identifiant: string;
  nom: string;
  prenom: string;
  adresseMail: string;
  niveau?: string | null;
}

export interface LoginResponse {
  message: string;
  user: LoginResponseUser;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginBase = `${environment.apiBase}/login`;

  constructor(private http: HttpClient) {}

  register(userData: RegisterRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.loginBase}/register`, userData);
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.loginBase}/login`, credentials);
  }
}
