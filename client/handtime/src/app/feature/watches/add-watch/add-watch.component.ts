import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import {
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { WatchService } from 'src/app/core/watch.service';

@Component({
  selector: 'app-add-watch',
  templateUrl: './add-watch.component.html',
  styleUrls: ['./add-watch.component.css'],
})
export class AddWatchComponent implements OnInit {
  faExclamationTriangle = faExclamationTriangle;
  errorMessage: string = '';

  constructor(private titleService: Title, private watchService: WatchService, private router: Router) {}

  ngOnInit(): void {
    this.titleService.setTitle('Add New Watch Page');
  }

  onAddWatch(addWatchForm: NgForm) {
    this.errorMessage = '';

    this.watchService.addWatch$(addWatchForm.value).subscribe({
      next: (watch) => {
        addWatchForm.reset();
        this.titleService.setTitle(`Watch ${watch.brand} ${watch.model} added successfully`);
        this.router.navigate(['/watches']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'An error occurred while adding the watch.';
      },
    })
  }
}
