import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router'; // Import the RouterConfig type
import routeConfig from './app/routes';  

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig) // Use the RouterConfig type
  ]
})
  .catch(err => console.error(err));
