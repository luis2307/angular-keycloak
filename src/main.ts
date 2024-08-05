import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { KeycloakAngularModule } from 'keycloak-angular';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(KeycloakAngularModule, FormsModule),
    provideHttpClient(),
    provideRouter(routes),
    ...appConfig.providers,
  ],
}).catch((err) => console.error(err));


//bootstrapApplication(AppComponent, appConfig)
//  .catch((err) => console.error(err));
