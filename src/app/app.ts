import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly logoUrl = 'https://cdn.builder.io/api/v1/image/assets%2Fc842a2f8e5074740934598f0bdabdeb5%2F75f8c1751c2c4702bddf81f0173274f4?format=webp&width=800&height=1200';
  menuOpen = false;
  readonly year = new Date().getFullYear();
}
