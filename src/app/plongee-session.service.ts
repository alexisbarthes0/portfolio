import { Injectable } from '@angular/core';

export interface PlongeeSessionUser {
  id: string;
  identifiant: string;
  nom?: string;
  prenom?: string;
}

const STORAGE_KEY = 'plongeeUser';

@Injectable({
  providedIn: 'root'
})
export class PlongeeSessionService {
  getUser(): PlongeeSessionUser | null {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as PlongeeSessionUser;
    } catch {
      return null;
    }
  }

  setUser(user: PlongeeSessionUser): void {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  clear(): void {
    sessionStorage.removeItem(STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    const u = this.getUser();
    return !!u?.id && !!u?.identifiant;
  }
}
