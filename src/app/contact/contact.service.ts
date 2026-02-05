import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactMessagePayload {
  email: string;
  nom: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly baseUrl = environment.apiBase;

  constructor(private http: HttpClient) {}

  sendMessage(payload: ContactMessagePayload): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/contact`, payload);
  }
}


