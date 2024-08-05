import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { importProvidersFrom } from '@angular/core';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:18080',
        realm: 'sigeca2',
        clientId: 'sigeca2-frontend-client'
      },
      initOptions: {
        //onLoad: 'login-required', // Cambiado a 'login-required'
        //silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
        onLoad: 'check-sso', // No forzar el login al cargar la aplicación
        //silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      },
      enableBearerInterceptor: true,
      bearerExcludedUrls: ['/assets']
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(KeycloakAngularModule),
    provideHttpClient(),
    provideRouter(routes, withRouterConfig({})),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ]
};