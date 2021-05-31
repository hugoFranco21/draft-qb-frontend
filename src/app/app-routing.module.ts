import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DraftComponent } from './pages/draft/draft.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RookieComponent } from './pages/rookie/rookie.component';
import { WinsComponent } from './pages/wins/wins.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'rookie-predictor', component: RookieComponent },
  { path: 'wins-predictor', component: WinsComponent },
  { path: 'should-you-do-it', component: DraftComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
