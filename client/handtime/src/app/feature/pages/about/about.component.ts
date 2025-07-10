import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import description from '../../../constants/description';


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
  }

  toggleReadMore(): void {
    this.readMore = !this.readMore;
  }
}
