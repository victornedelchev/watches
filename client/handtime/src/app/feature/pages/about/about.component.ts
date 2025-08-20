import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Loader } from '@googlemaps/js-api-loader';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import description from '../../../constants/description';
import { WatchService } from 'src/app/core/watch.service';
import { IWatch } from 'src/app/core/interfaces/watch';
import { UserService } from 'src/app/core/user.service';

declare const google: any;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})

export class AboutComponent implements OnInit, OnDestroy {
  readMore: boolean = true;
  description = description;
  latestTwoWatchList: IWatch[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  private intervalId: any;
  faExclamationTriangle = faExclamationTriangle

  constructor(
    private titleService: Title,
    private watchService: WatchService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('About Page');

    let loader = new Loader({
      apiKey: 'AIzaSyBVi7HNr2M81GiZWLOSFrVu43TCkN9MGbI',
    });

    this.watchService.loadLastTwoWatchList$().subscribe({
      next: (data: IWatch[]) => {
        this.latestTwoWatchList = data;
        this.isLoading = false;
      },
      error: (err) => {
        if (err.status === 403) {
          this.intervalId = setInterval(() => {
            this.userService.logout$().subscribe(() => {
              this.router.navigate(['/user/login']);
            });
          }, 2500);
        }
       
        this.isLoading = false;
        this.errorMessage = err.error.message || 'Error loading watches';
        console.error('Error loading watches', err);
      }
    })

    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 43.345082, lng: 27.195437 },
        zoom: 17,
        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#1d2c4d"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#8ec3b9"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1a3646"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#4b6878"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#64779e"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#4b6878"
              }
            ]
          },
          {
            "featureType": "landscape.man_made",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#334e87"
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#023e58"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#283d6a"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#6f9ba5"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1d2c4d"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#023e58"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#3C7680"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#304a7d"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#98a5be"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1d2c4d"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#2c6675"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#255763"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#b0d5ce"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#023e58"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#98a5be"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1d2c4d"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#283d6a"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#3a4762"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#0e1626"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#4e6d70"
              }
            ]
          }
        ]
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

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
