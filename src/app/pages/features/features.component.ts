import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RatingModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent {
  value = 4;
}

// export const routes: Routes = [
//   { path: 'features', component: FeaturesComponent },
//   { path: 'home', component: HomeComponent },
//   { path: 'calc', component: CalcComponent },
//   { path: 'adv', component: CalcComponent },
//   { path: 'abour', component: AboutComponent },
//   { path: '**', redirectTo: 'home' }, // default page
// ];
