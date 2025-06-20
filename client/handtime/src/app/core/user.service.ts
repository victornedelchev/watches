import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { IUser } from './interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

const API_URL = environment.API_URL;

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser!: IUser;

  get isLogged(): boolean {
    return !!this.currentUser;
  }

  constructor(private storage: StorageService, private http: HttpClient) {}

  register$(userData: CreateUserDto): Observable<IUser> {
    return this.http.post<IUser>(`${API_URL}/register`, userData);
  }

  login(): void {}

  logOut(): void {}
}
