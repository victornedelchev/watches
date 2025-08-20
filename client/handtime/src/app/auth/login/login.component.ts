import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faExclamationTriangle,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  faEnvelope = faEnvelope;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faExclamationTriangle = faExclamationTriangle;
  showPassword = false;
  errorMessage: string = '';
  formStatus: string = '';

  loginFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(
    private titleService: Title,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Login Page');

   this.loginFormGroup.statusChanges.subscribe((status) => {
      this.formStatus = status;
    })
  }

  loginHandler(): void {
    this.errorMessage = '';

    const { email, password } = this.loginFormGroup.value;

    const body = {
      email: email.trim(),
      password: password.trim(),
    }


    this.userService.login$({ email: body.email, password: body.password }).subscribe({
      next: () => {
        this.router.navigate(['/watches']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed. Please try again.';
      },
    })
  }

  viewPass(): void {
    this.showPassword = !this.showPassword;
  }
}
