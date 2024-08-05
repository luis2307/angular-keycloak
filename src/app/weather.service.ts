import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = 'https://localhost:7102/WeatherForecast';

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {}

  async getWeatherForecast(): Promise<Observable<any>> {
    const token = await this.keycloakService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl, { headers });
  }
}
