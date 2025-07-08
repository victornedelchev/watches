import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IWeather } from 'src/app/core/interfaces/weather';
import { environment } from 'src/environments/environment.development';

const icons: { [key: string]: string } = {
  "01d": 'assets/images/weather/clear.png', // clear_icon_day
  "01n": 'assets/images/weather/moon.png', // clear_icon_night
  "02d": 'assets/images/weather/cloud.png', // cloud_icon_day
  "02n": 'assets/images/weather/partly-cloudy-night.png', // cloud_icon_night
  "03d": 'assets/images/weather/cloud.png', // cloud_icon_day
  "03n": 'assets/images/weather/partly-cloudy-night.png', // cloud_icon_night
  "04d": 'assets/images/weather/cloud.png', // cloud_icon_day
  "04n": 'assets/images/weather/partly-cloudy-night.png', // cloud_icon_night
  "09d": 'assets/images/weather/drizzle.png', //drizzle_icon_day,
  "09n": 'assets/images/weather/night-drizzle.png',// drizzle_icon_night,
  "10d": 'assets/images/weather/rain.png', // rain_icon_day,
  "10n": 'assets/images/weather/night-raining.png',// rain_icon_night,
  "13d": 'assets/images/weather/snow.png', // snow_icon_day,
  "13n": 'assets/images/weather/night-snow.png',// snow_icon_night,
};

const WEATHER_API_KEY = environment.WEATHER_API_KEY;

@Component({
  selector: 'app-get-weather',
  templateUrl: './get-weather.component.html',
  styleUrls: ['./get-weather.component.css']
})
export class GetWeatherComponent implements OnInit {
  @ViewChild('cityInput') cityInput!: ElementRef;

  weatherData: IWeather | null = null;
  humidity!: number;
  winSpeed!: number;
  temperature!: number;
  location!: string;
  icon!: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.search('Novi pazar, BG');
  }

  search(city: string) {
    if (!city) {
      alert('Please enter a city name!');
      return
    }

    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`;

    this.http.get<IWeather>(WEATHER_URL).subscribe({
      next: (data: IWeather) => {
        this.humidity = data.main.humidity,
          this.winSpeed = data.wind.speed,
          this.temperature = Math.floor(data.main.temp),
          this.location = data.name,
          this.icon = icons[data.weather[0].icon];
          this.cityInput.nativeElement.value = '';
      },
      error: (err) => {
        this.weatherData = null;
        alert(err.error.message || 'Error fetching weather data');
      }
    })
  }

  onSearchClick() {
    this.search(this.cityInput.nativeElement.value);
  }

}
