import { Component, OnInit } from '@angular/core';
import { ContactService, ContactMessage } from '../contact/contact.service';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {

  messages: ContactMessage[] = [];
  isLoading = false;
  loadError: string | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  private loadMessages(): void {
    this.isLoading = true;
    this.loadError = null;

    this.contactService.getMessages().subscribe({
      next: (messages) => {
        this.messages = messages;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des messages de contact :', err);
        this.loadError = 'Impossible de charger les messages de contact. Veuillez réessayer plus tard.';
        this.isLoading = false;
      }
    });
  }
}
