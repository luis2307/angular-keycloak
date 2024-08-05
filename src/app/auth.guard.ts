import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const isLoggedIn = await this.keycloakService.isLoggedIn();
    if (isLoggedIn) {
      return true;
    } else {
      return this.router.createUrlTree(['/']);
    }
  }
}
