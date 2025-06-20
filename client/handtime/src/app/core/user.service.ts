import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLogged: boolean = false;

  constructor(private storage: StorageService) {
    this.isLogged = this.storage.getItem('isLogged') ?? false;
  }

  login(): void {
    this.isLogged = true;
    this.storage.setItem('isLogged', true);
  }

  logOut(): void {
    this.isLogged = false;
    this.storage.setItem('isLogged', false);
  }
}
