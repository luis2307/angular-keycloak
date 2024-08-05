import { Component } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  imports: [AuthComponent, NgIf]
})
export class WelcomeComponent {
  constructor(  private router: Router) {}
  accessButton() { 
   this.router.navigate(['/access']);
  } 
}
