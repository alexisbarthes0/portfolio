import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlongeeService } from '../plongee.service';
import { PlongeeSessionService } from '../plongee-session.service';

@Component({
  selector: 'app-plongee-nouvelle',
  templateUrl: './plongee-nouvelle.component.html',
  styleUrls: ['./plongee-nouvelle.component.css']
})
export class PlongeeNouvelleComponent {
  error?: string;
  loading = false;

  form = this.fb.group({
    lieu: ['', Validators.required],
    date: ['', Validators.required],
    palanquee: [''],
    directeurPlongee: ['', Validators.required],
    profMax: [0, [Validators.required, Validators.min(0)]],
    temperatureEau: [''],
    especesObservees: [''],
    evenementsMarquants: [''],
    remarques: [''],
    // Début Modification
    duration: [''],
    titre:['']
    //Fin modification

  });

  constructor(
    private fb: FormBuilder,
    private plongeeService: PlongeeService,
    private session: PlongeeSessionService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.form.invalid) return;
    const user = this.session.getUser();
    if (!user?.id) {
      this.error = 'Session expirée. Reconnectez-vous.';
      return;
    }
    this.loading = true;
    this.error = undefined;
    const v = this.form.getRawValue();
    this.plongeeService
      .create({
        userId: user.id,
        lieu: v.lieu || '',
        date: this.toIsoDate(v.date!),
        palanquee: v.palanquee || '',
        directeurPlongee: v.directeurPlongee || '',
        profMax: Number(v.profMax),
        temperatureEau: v.temperatureEau || undefined,
        especesObservees: v.especesObservees || undefined,
        evenementsMarquants: v.evenementsMarquants || undefined,
        remarques: v.remarques || undefined,
        //début modification
        duration: Number(v.duration),
        titre: v.titre || undefined,
        //Fin modification
      })
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/plongée']);
        },
        error: (err) => {
          this.loading = false;
          this.error = this.httpErrorMessage(err);
        }
      });
  }

  private toIsoDate(dateInput: string): string {
    const parts = dateInput.split('-').map(Number);
    if (parts.length !== 3 || parts.some((n) => isNaN(n))) {
      return new Date().toISOString();
    }
    const [y, m, d] = parts;
    const local = new Date(y, m - 1, d, 12, 0, 0);
    return local.toISOString();
  }

  private httpErrorMessage(err: { error?: unknown }): string {
    const e = err?.error;
    if (typeof e === 'string') return e;
    if (e && typeof e === 'object' && 'message' in e && typeof (e as { message: string }).message === 'string') {
      return (e as { message: string }).message;
    }
    return 'Enregistrement impossible';
  }
}
