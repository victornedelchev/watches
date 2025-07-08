import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { IWeather } from '../../interfaces/weather';

const icons: { [key: string]: string } = {
  "01d": 'assets/images/weather/clear.png', // clear_icon_day
  "01n": 'assets/images/weather/moon.png', // clear_icon_night
  "02d": 'assets/images/weather.cloud.png', // cloud_icon_day
  "02n": 'assets/images/weather/partly-cloudy-night.png', // cloud_icon_night
  "03d": 'assets/images/weather.cloud.png', // cloud_icon_day
  "03n": 'assets/images/weather/partly-cloudy-night.png', // cloud_icon_night
  "04d": 'assets/images/weather.cloud.png', // cloud_icon_day
  "04n": 'assets/images/weather/partly-cloudy-night.png', // cloud_icon_night
  "09d": 'assets/images/weather/drizzle.png', //drizzle_icon_day,
  "09n": 'assets/images/weather/night-drizzle.png',// drizzle_icon_night,
  "10d": 'assets/images/weather/rain.png', // rain_icon_day,
  "10n": 'assets/images/weather/night-raining.png',// rain_icon_night,
  "13d": 'assets/images/weather/snow.png', // snow_icon_day,
  "13n": 'assets/images/weather/night-snow.png',// snow_icon_night,
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

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getWeather$().subscribe({
      next: (data: IWeather) => {
        this.isLoading = false;
        this.weatherInfo = data;
        this.temperature = Math.floor(this.weatherInfo.main.temp) || 0;
        this.location = this.weatherInfo.name;
        this.icon = icons[this.weatherInfo.weather[0].icon] || icons['01d'];
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    })
  }
}
