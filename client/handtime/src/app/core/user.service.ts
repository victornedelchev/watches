import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { filter, map, Observable, tap } from 'rxjs';
import { IUser } from './interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

const API_URL = environment.API_URL;

export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
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

  register$(userData: RegisterUserDto): Observable<IUser> {
    return this.http.post<IUser>(`${API_URL}/register`, userData);
  }

  login$(userData: LoginUserDto): Observable<IUser> {
    return this.http
      .post<IUser>(`${API_URL}/login`, userData, {
        observe: 'response',
      })
      .pipe(
        map((response) => response.body),
        filter((user): user is IUser => user !== null),
        tap((user) => (this.currentUser = user))
      );
  }

  logOut(): void {}
}
