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
  currentUser!: IUser | null;

  get isLogged(): boolean {
    return !!this.currentUser;
  }

  constructor(private storage: StorageService, private http: HttpClient) { }

  register$(userData: RegisterUserDto): Observable<IUser & { accessToken: string }> {
    return this.http.post<IUser & { accessToken: string }>(`${API_URL}/register`, userData).pipe(
      tap((response) => {
        if (response.accessToken) {
          localStorage.setItem('access_token', response.accessToken);
        }
        this.currentUser = response;
      })
    );
  }

  login$(userData: LoginUserDto): Observable<IUser & { accessToken: string }> {
    return this.http
      .post<IUser & { accessToken: string }>(`${API_URL}/login`, userData, {
        observe: 'response',
      })
      .pipe(
        map((response) => response.body),
        filter((user): user is IUser & { token: string } => user !== null),
        tap((user) => {
          if (user.accessToken) {
            localStorage.setItem('access_token', user.accessToken);
          }
          this.currentUser = user;
        })
      );
  }

  getUser$(): Observable<IUser> {
    return this.http
      .get<IUser>(`${API_URL}/me`)
      .pipe(tap((user) => (this.currentUser = user)));
  }

  logOut(): void {
    localStorage.removeItem('access_token');
    this.currentUser = null;
  }
}
