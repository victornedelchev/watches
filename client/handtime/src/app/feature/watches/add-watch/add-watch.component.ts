import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import {
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

import { IWatch } from 'src/app/core/interfaces/watch';
import { UserService } from 'src/app/core/user.service';
import { WatchService } from 'src/app/core/watch.service';

@Component({
  selector: 'app-add-watch',
  templateUrl: './add-watch.component.html',
  styleUrls: ['./add-watch.component.css'],
})
export class AddWatchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('addWatchForm') addWatchForm!: NgForm;

  faExclamationTriangle = faExclamationTriangle;
  errorMessage: string = '';
  formStatus: string = '';
  intervalId: any;

  constructor(
    private titleService: Title,
    private watchService: WatchService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('Add New Watch Page');
  }

  ngAfterViewInit(): void {
    this.addWatchForm.statusChanges?.subscribe((status) => {
      if (this.addWatchForm.touched || this.addWatchForm.dirty) {
        this.formStatus = status;
      } else {
        this.formStatus = '';
      }
    });
  }

  onAddWatch(addWatchForm: NgForm) {
    this.errorMessage = '';

    this.watchService.addWatch$(addWatchForm.value).subscribe({
      next: (watch: IWatch) => {
        addWatchForm.reset();
        this.titleService.setTitle(`Watch ${watch.brand} ${watch.model} added successfully`);
        this.router.navigate(['/watches']);
      },
      error: (err) => {
        if (err.status === 403) {
          this.intervalId = setInterval(() => {
            this.userService.logout$().subscribe(() => {
              this.router.navigate(['/user/login']);
            })
          }, 2000);
        }
        this.errorMessage = err.error.message || 'An error occurred while adding the watch.';
      },
    })
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
