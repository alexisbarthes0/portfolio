import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Plongee {
  id: string;
  userId: string;
  lieu: string;
  date: string;
  profMax: number;
  duree?: number;
  description?: string;
  palanquee: string;
  directeurPlongee: string;
  temperatureEau?: string;
  especesObservees?: string;
  evenementsMarquants?: string;
  remarques?: string;
  duration?:number;
  titre?:string;
}

export interface PlongeeCreatePayload {
  userId: string;
  lieu: string;
  date: string;
  palanquee: string;
  directeurPlongee: string;
  profMax: number;
  temperatureEau?: string;
  especesObservees?: string;
  evenementsMarquants?: string;
  remarques?: string;
  duration?:number;
  titre?:string;
}

@Injectable({
  providedIn: 'root'
})
export class PlongeeService {
  private readonly base = `${environment.apiBase}/plongees`;

  constructor(private http: HttpClient) {}

  listByUser(userId: string): Observable<Plongee[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Plongee[]>(this.base, { params });
  }

  create(payload: PlongeeCreatePayload): Observable<Plongee> {
    return this.http.post<Plongee>(this.base, payload);
  }
}
