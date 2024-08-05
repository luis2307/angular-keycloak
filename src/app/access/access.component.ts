import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { AuthComponent } from '../auth/auth.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-access',
  standalone: true,
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css'],
  imports: [AuthComponent, NgIf]
})
export class AccessComponent implements OnInit {

  constructor(private keycloakService: KeycloakService, private router: Router) {}

  async ngOnInit() {
    const isAuthenticated = await this.keycloakService.isLoggedIn();
    if (isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }
}
