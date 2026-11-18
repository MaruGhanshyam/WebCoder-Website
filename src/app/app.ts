import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly logoUrl = 'https://cdn.builder.io/api/v1/image/assets%2Fc842a2f8e5074740934598f0bdabdeb5%2F34b9b1fb1b8d4029b6303bfb25efd4ee?format=webp&width=800&height=1200';
  menuOpen = false;
  readonly year = new Date().getFullYear();
}
