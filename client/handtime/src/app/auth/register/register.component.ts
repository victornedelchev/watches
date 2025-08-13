import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import {
  faExclamationTriangle,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { noSpaceAllowed, passwordMismatch } from '../utils';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  faUser = faUser;
  faExclamationTriangle = faExclamationTriangle;
  faEnvelope = faEnvelope;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword: boolean = false;
  showRePassword: boolean = false;
  errorMessage: string = '';

  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  get passwordGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    username: new FormControl('', [
      Validators.required,
      noSpaceAllowed,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required]),
    passwords: new FormGroup({
      password: this.passwordControl,
      rePassword: new FormControl('', [
        Validators.required,
        passwordMismatch(this.passwordControl),
      ]),
    }),
  });

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Register Page');
  }

  viewPass(): void {
    this.showPassword = !this.showPassword;
  }

  viewRePass(): void {
    this.showRePassword = !this.showRePassword;
  }

  registerHandler(): void {
    this.errorMessage = '';

    const { username, email, passwords } = this.registerFormGroup.value;

    const body = {
      username: username.trim(),
      email: email.trim(),
      password: passwords.password,
    };

    this.userService.register$(body).subscribe({
      next: (response) => {
        if (response.accessToken) {
          this.router.navigate(['/watches']);
        } else {
          this.userService.login$({ email: body.email, password: body.password }).subscribe({
            next: () => {
              this.router.navigate(['/watches']);
            },
            error: (err) => {
              this.errorMessage = err.error?.message || 'Login failed after registration. Please try logging in.';
            }
          });
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
