import { Component } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
// import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  // UpdateValue(value: any) {
  //   alert(value);
  //   this.value = 1;
  // }
  // value = 4;
}
