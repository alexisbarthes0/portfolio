import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:3000/projects'; // ton backend Node.js

  constructor(private http: HttpClient) {}

  // Récupérer tous les projets
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Ajouter un projet
  addProject(project: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, project);
  }
}