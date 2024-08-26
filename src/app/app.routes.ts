import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { FeaturesComponent } from './pages/features/features.component';
import { CalcComponent } from './pages/calc/calc.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'features', component: FeaturesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'calc', component: CalcComponent },
  { path: 'adv', component: CalcComponent },
  { path: 'about', component: AboutComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' }, // default page
  { path: '**', loadComponent: () => PageNotFoundComponent }, // default page
];
