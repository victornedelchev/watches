import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { IWeather } from 'src/app/core/interfaces/weather';
import { environment } from 'src/environments/environment.development';

const icons: { [key: string]: string } = {
  "01d": 'assets/images/weather/clear.png',
  "01n": 'assets/images/weather/moon.png',
  "02d": 'assets/images/weather/cloud.png',
  "02n": 'assets/images/weather/partly-cloudy-night.png',
  "03d": 'assets/images/weather/cloud.png',
  "03n": 'assets/images/weather/partly-cloudy-night.png',
  "04d": 'assets/images/weather/cloud.png',
  "04n": 'assets/images/weather/partly-cloudy-night.png',
  "09d": 'assets/images/weather/drizzle.png',
  "09n": 'assets/images/weather/night-drizzle.png',
  "10d": 'assets/images/weather/rain.png',
  "10n": 'assets/images/weather/night-raining.png',
  "13d": 'assets/images/weather/snow.png',
  "13n": 'assets/images/weather/night-snow.png',
};

const WEATHER_API_KEY = environment.WEATHER_API_KEY;

@Component({
  selector: 'app-get-weather',
  templateUrl: './get-weather.component.html',
  styleUrls: ['./get-weather.component.css']
})
export class GetWeatherComponent implements OnInit {
  @ViewChild('cityInput') cityInput!: ElementRef;

  humidity!: number;
  winSpeed!: number;
  temperature!: number;
  location!: string;
  icon!: string;
  faExclamationTriangle = faExclamationTriangle
  errorMessage = '';
  lastCity: string = 'Novi pazar, BG';
  private weatherInterval: any;
  minute: number = 60 * 1000;

  constructor(private titleService: Title, private http: HttpClient) { }

  ngOnInit(): void {
    this.titleService.setTitle('Get Weather Page');
    this.search(this.lastCity);
    this.weatherInterval = setInterval(() => {
      this.search(this.lastCity, false);
    }, this.minute);
  }

  search(city: string, updateLastCity: boolean = true) {
    if (!city) {
      this.errorMessage = 'Please enter a city name!';
      return
    }

    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`;

    this.http.get<IWeather>(WEATHER_URL).subscribe({
      next: (data: IWeather) => {
        this.errorMessage = ''; 
        this.humidity = data.main.humidity,
        this.winSpeed = data.wind.speed,
        this.temperature = Math.floor(data.main.temp),
        this.location = data.name,
        this.icon = icons[data.weather[0].icon];
        this.cityInput.nativeElement.value = '';

        if (updateLastCity) {
          this.lastCity = city;
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Error fetching weather data';
      }
    })
  }

  onSearchClick() {
    this.search(this.cityInput.nativeElement.value);
  }

  ngOnDestroy(): void {
    if (this.weatherInterval) {
      clearInterval(this.weatherInterval);
    }
  }
}
