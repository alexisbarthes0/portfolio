import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProComponent }from './pro/pro.component';
import { ScolariteComponent } from './scolarite/scolarite.component';
import { MesProjetsComponent } from './mes-projets/mes-projets.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ContactComponent } from './contact/contact.component';
import { SituationComponent } from './situation/situation.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { PlongeeFrontComponent } from './plongee-front/plongee-front.component';
import { PlongeeLoginComponent } from './plongee-login/plongee-login.component';
import { PlongeeDataComponent } from './plongee-data/plongee-data.component';
import { PlongeeRegisterComponent } from './plongee-register/plongee-register.component';
import { AdminComponent } from './admin/admin.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { AdminAuthGuard } from './admin/admin-auth.guard';
import { DossierProComponent } from './dossier-pro/dossier-pro.component';
const routes: Routes = [
  {path: 'pro' , component:ProComponent},
  {path: 'scolarite', component:ScolariteComponent},
  {path: 'mes-projets', component:MesProjetsComponent},
  {path:'', component:AccueilComponent},
  {path:'contact', component:ContactComponent},
  {path:'mentions-legales', component:MentionsLegalesComponent},
  {path:'situation', component:SituationComponent},
  {path:'plongée', component:PlongeeFrontComponent},
  {path:'plongée-login', component:PlongeeLoginComponent},
  {path:'mes-plongées', component:PlongeeDataComponent},
  {path:'plongée-register', component:PlongeeRegisterComponent},
  {path:'admin', component:AdminComponent},
  {path:'admin-portal', component:AdminPortalComponent, canActivate:[AdminAuthGuard]},
  {path:'dossier-pro', component: DossierProComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
