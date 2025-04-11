import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule], // ✅ Required for routerLink
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // if you have styles
})
export class HomeComponent {
  currentYear = new Date().getFullYear();
}
