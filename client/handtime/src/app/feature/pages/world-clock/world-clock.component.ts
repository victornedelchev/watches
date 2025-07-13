import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-world-clock',
  templateUrl: './world-clock.component.html',
  styleUrls: ['./world-clock.component.css']
})
export class WorldClockComponent implements OnInit, OnDestroy {
  cities = [
    { name: 'New York', zone: 'America/New_York', time: '' },
    { name: 'Los Angeles', zone: 'America/Los_Angeles', time: '' },
    { name: 'Rio De Janeiro', zone: 'America/Sao_Paulo', time: '' },
    { name: 'London', zone: 'Europe/London', time: '' },
    { name: 'Paris', zone: 'Europe/Paris', time: '' },
    { name: 'Berlin', zone: 'Europe/Berlin', time: '' },
    { name: 'Amsterdam', zone: 'Europe/Berlin', time: '' },
    { name: 'Moscow', zone: 'Europe/Moscow', time: '' },
    { name: 'Dubai', zone: 'Asia/Dubai', time: '' },
    { name: 'Beijing', zone: 'Asia/Shanghai', time: '' },
    { name: 'Tokyo', zone: 'Asia/Tokyo', time: '' },
    { name: 'Sydney', zone: 'Australia/Sydney', time: '' },
  ];

  private intervalId: any;

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('World Clock Page');

    this.updateTime();
    this.intervalId = setInterval(() => {
      this.updateTime()
    }, 1000);
  }

  updateTime() {
    this.cities.forEach(city => {
      city.time = DateTime.now().setZone(city.zone).toFormat('HH:mm:ss');
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
