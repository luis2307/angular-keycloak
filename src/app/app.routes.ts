import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AccessComponent } from './access/access.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'access', component: AccessComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
];
