import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import {
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-watch',
  templateUrl: './edit-watch.component.html',
  styleUrls: ['./edit-watch.component.css']
})
export class EditWatchComponent {
  faExclamationTriangle = faExclamationTriangle;
  errorMessage: string = '';

  editWatch(editWatchForm: NgForm) {

  }
}
