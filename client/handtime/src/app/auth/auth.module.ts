import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { AuthRouterModule } from './auth-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { WatchesModule } from '../feature/watches/watches.module';
import { SharedModule } from "../shared/shared.module";
import { EmailValidatorDirective } from './email-validator.directive';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent, EmailValidatorDirective],
  imports: [
    CommonModule,
    RouterModule,
    AuthRouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    WatchesModule,
    SharedModule
  ],
  exports: [LoginComponent, RegisterComponent, ProfileComponent],
})
export class AuthModule { }
