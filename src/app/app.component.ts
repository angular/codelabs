import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
  <main>
    <header class="brand-name">
      <img src="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
    </header>
      <section class="contenet">
        <router-outlet></router-outlet>
      </section>
    </main>
    `,
  styleUrls: ['./app.component.css'],
  imports: [HomeComponent, RouterModule]
})
export class AppComponent {
  title = 'homes';
}
