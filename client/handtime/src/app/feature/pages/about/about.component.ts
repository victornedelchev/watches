import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import description from '../../../constants/description';
import { Loader } from '@googlemaps/js-api-loader';

declare const google: any;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})

export class AboutComponent implements OnInit {
  readMore: boolean = true;
  description = description;
  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('About Page');

    let loader = new Loader({
      apiKey: 'AIzaSyBVi7HNr2M81GiZWLOSFrVu43TCkN9MGbI',
    });

    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 43.345082, lng: 27.195437 },
        zoom: 17,
      });

      new google.maps.Marker({
        position: { lat: 43.345082, lng: 27.195437 },
        map: map,
        title: 'Checkpoint'
      })
    })
  }

  toggleReadMore(): void {
    this.readMore = !this.readMore;
  }
}
