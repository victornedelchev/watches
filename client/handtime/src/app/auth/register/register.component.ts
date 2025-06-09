import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  faUser = faUser;
  faEnvelope = faEnvelope;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword: boolean = false;
  showRePassword: boolean = false;

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Register Page');
  }

  viewPass(): void {
    this.showPassword = !this.showPassword;
  }

  viewRePass(): void {
    this.showRePassword = !this.showRePassword;
  }
}
