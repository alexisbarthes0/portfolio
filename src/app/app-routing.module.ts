import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProComponent }from './pro/pro.component';
import { ScolariteComponent } from './scolarite/scolarite.component';
import { MesProjetsComponent } from './mes-projets/mes-projets.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ContactComponent } from './contact/contact.component';
import { SituationComponent } from './situation/situation.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
const routes: Routes = [
  {path: 'pro' , component:ProComponent},
  {path: 'scolarite', component:ScolariteComponent},
  {path: 'mes-projets', component:MesProjetsComponent},
  {path:'', component:AccueilComponent},
  {path:'contact', component:ContactComponent},
  {path:'mentions-legales', component:MentionsLegalesComponent},
  {path:'situation', component:SituationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
