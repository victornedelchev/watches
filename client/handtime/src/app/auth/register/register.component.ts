import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';

import {
  faExclamationTriangle,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { emailValidator, passwordMismatch } from './utils';
import { UserService } from 'src/app/core/user.service';
import { Router } from '@angular/router';

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
    Validators.minLength(6),
  ]);

  get passwordGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, emailValidator]),
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

  onSubmit(): void {
    this.errorMessage = '';

    const { username, email, passwords } = this.registerFormGroup.value;

    const body = {
      username: username,
      email: email,
      password: passwords.password,
    };

    this.userService.register$(body).subscribe({
      next: () => {
        this.router.navigate(['/home'])
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Registration failed. Please try again.';
      }
    })
  }
}
