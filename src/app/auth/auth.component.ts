import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [NgIf]
})
export class AuthComponent implements OnInit {
  isAuthenticated = false;
  username: string | undefined;

  constructor(private keycloakService: KeycloakService, private router: Router) {}

  async ngOnInit() {
    this.isAuthenticated = await this.keycloakService.isLoggedIn();
    if (this.isAuthenticated) {
      const userDetails = await this.keycloakService.loadUserProfile();
      this.username = userDetails.username;
    }
  }

  async login() {
    await this.keycloakService.login();
    this.isAuthenticated = await this.keycloakService.isLoggedIn();
    if (this.isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }

  logout() {
    this.keycloakService.logout();
  }
}
