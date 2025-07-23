import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';
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
  public currentUser$ = new BehaviorSubject<IUser | null>(null);

  constructor(private storage: StorageService, private http: HttpClient) { 
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.currentUser$.next(JSON.parse(userJson));
    }
  }

  setCurrentUser(user: IUser) {
    this.currentUser$.next(user);
  }

  getCurrentUser () {
    return this.currentUser$.value;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  register$(userData: RegisterUserDto): Observable<IUser & { accessToken: string }> {
    return this.http.post<IUser & { accessToken: string }>(`${API_URL}/register`, userData).pipe(
      tap((response) => {
        if (response.accessToken) {
          localStorage.setItem('access_token', response.accessToken);
        }
        localStorage.setItem('user', JSON.stringify(response));
        this.currentUser$.next(response);
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
        filter((user): user is IUser & { accessToken: string } => user !== null),
        tap((user) => {
          if (user.accessToken) {
            localStorage.setItem('access_token', user.accessToken);
          }
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser$.next(user);
        })
      );
  }

  getUser$(): Observable<IUser> {
    return this.http
      .get<IUser>(`${API_URL}/me`)
      .pipe(tap((user) => (this.currentUser$.next(user))));
  }

  logOut(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.currentUser$.next(null);
  }

  logout$(): Observable<void> {
    this.logOut();

    return this.http.post<void>(`${API_URL}/logout`, {}).pipe(
      map(() => void 0)
    )
  }
}
