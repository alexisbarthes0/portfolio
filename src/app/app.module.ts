import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ScolariteComponent } from './scolarite/scolarite.component';
import { MesProjetsComponent } from './mes-projets/mes-projets.component';
import { ProComponent } from './pro/pro.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { ContactComponent } from './contact/contact.component';
import { SituationComponent } from './situation/situation.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlongeeLoginComponent } from './plongee-login/plongee-login.component';
import { PlongeeFrontComponent } from './plongee-front/plongee-front.component';
import { PlongeeHeaderComponent } from './plongee-header/plongee-header.component';
import { PlongeeDataComponent } from './plongee-data/plongee-data.component';
import { PlongeeRegisterComponent } from './plongee-register/plongee-register.component';
import { PlongeeNouvelleComponent } from './plongee-nouvelle/plongee-nouvelle.component';
import { AdminComponent } from 'src/app/admin/admin.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { DossierProComponent } from './dossier-pro/dossier-pro.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ScolariteComponent,
    MesProjetsComponent,
    ProComponent,
    AccueilComponent,
    MentionsLegalesComponent,
    ContactComponent,
    SituationComponent,
    PlongeeLoginComponent,
    PlongeeFrontComponent,
    PlongeeHeaderComponent,
    PlongeeDataComponent,
    PlongeeRegisterComponent,
    PlongeeNouvelleComponent,
    AdminComponent,
    AdminPortalComponent,
    DossierProComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
