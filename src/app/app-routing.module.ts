import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ScorePageComponent } from './components/score-page/score-page.component';

const routes: Routes = [{ path: '', component: MainPageComponent },
{path: 'admin', component: AdminPageComponent},
{path: 'score', component: ScorePageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
