import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import {
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-watch',
  templateUrl: './add-watch.component.html',
  styleUrls: ['./add-watch.component.css'],
})
export class AddWatchComponent implements OnInit {
  faExclamationTriangle = faExclamationTriangle;
  errorMessage: string = '';

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Add New Watch Page');
  }

  onAddWatch(addWatchForm: NgForm) {
    this.errorMessage = '';
    console.log(addWatchForm.value);
  }
}
