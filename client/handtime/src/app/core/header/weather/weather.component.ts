import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { IWeather } from '../../interfaces/weather';

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


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {
  weatherInfo!: IWeather;
  temperature!: number;
  location!: string;
  icon!: string;
  isLoading: boolean = true;
  isHot: boolean = false;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getWeather$().subscribe({
      next: (data: IWeather) => {
        this.isLoading = false;
        this.weatherInfo = data;
        this.temperature = Math.floor(this.weatherInfo.main.temp) || 0;
        this.location = this.weatherInfo.name;
        this.icon = icons[this.weatherInfo.weather[0].icon] || icons['01d'];

        if (this.temperature > 25) {
          this.isHot = true;
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    })
  }
}
