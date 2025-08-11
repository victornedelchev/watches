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
    { name: 'Los Angeles', zone: 'America/Los_Angeles', time: '' },
    { name: 'Mexico', zone: 'America/Mexico_City', time: '' },
    { name: 'New York', zone: 'America/New_York', time: '' },
    { name: 'Rio De Janeiro', zone: 'America/Sao_Paulo', time: '' },
    { name: 'London', zone: 'Europe/London', time: '' },
    { name: 'Paris', zone: 'Europe/Paris', time: '' },
    { name: 'Sofia', zone: 'Europe/Sofia', time: '' },
    { name: 'Istanbul', zone: 'Europe/Istanbul', time: '' },
    { name: 'Dubai', zone: 'Asia/Dubai', time: '' },
    { name: 'Astana', zone: 'Asia/Almaty', time: '' },
    { name: 'Mumbai', zone: 'Asia/Kolkata', time: '' },
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
