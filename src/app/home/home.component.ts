import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { NgIf } from '@angular/common';
import { WeatherService } from '../weather.service'; 

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NgIf]
})
export class HomeComponent implements OnInit {
  username: string | undefined;
  weatherData: string = '';

  constructor(
    private keycloakService: KeycloakService,
    private weatherService: WeatherService
  ) {}

  async ngOnInit() {
    const userDetails = await this.keycloakService.loadUserProfile();
    this.username = userDetails.username;
    const userNamelocal= await this.keycloakService.getUsername();
    console.log(userNamelocal);
  }

  logout() {
    this.keycloakService.logout();
    this.keycloakService.clearToken(); 
  }
  async fetchWeather() {
    try {
      const weatherObservable = await this.weatherService.getWeatherForecast();
      weatherObservable.subscribe({
        next: (data) => {
          this.weatherData = JSON.stringify(data, null, 2);
          console.log(data);
        },
        error: (error) => {
          console.error('Error fetching weather forecast:', error);
        }
      });
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
    }
  }
}
