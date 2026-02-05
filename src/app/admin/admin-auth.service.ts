import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AdminLoginPayload {
  login: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private readonly baseUrl = environment.apiBase;

  constructor(private http: HttpClient) {}

  login(payload: AdminLoginPayload): Observable<AdminLoginResponse> {
    return this.http.post<AdminLoginResponse>(`${this.baseUrl}/admin/login`, payload);
  }
}


