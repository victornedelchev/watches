import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeather } from './interfaces/weather';
import { environment } from 'src/environments/environment.development';

const WEATHER_API_KEY = environment.WEATHER_API_KEY;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  city: string = 'Novi pazar, BG';

  constructor(private http: HttpClient) { }

  getWeather$(): Observable<IWeather> {
    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${WEATHER_API_KEY}`;
    return this.http.get<IWeather>(WEATHER_URL);
  }
}
