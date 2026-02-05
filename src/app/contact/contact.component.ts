import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  isSending = false;
  sendError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.sendError = null;

    if (this.contactForm.invalid) {
      return;
    }

    const payload = {
      email: this.contactForm.value.email,
      nom: this.contactForm.value.name,
      message: this.contactForm.value.message,
    };

    this.isSending = true;

    this.contactService.sendMessage(payload).subscribe({
      next: () => {
        alert('Merci pour votre message !');
        this.contactForm.reset();
        this.submitted = false;
        this.isSending = false;
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi du message de contact :', err);
        this.sendError = 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.';
        this.isSending = false;
      }
    });
  }
}
