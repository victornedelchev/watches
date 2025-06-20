import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IWatch } from './interfaces/watch';
import { environment } from 'src/environments/environment.development';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class WatchService {
  constructor(private http: HttpClient) {}

  loadWatchList$(): Observable<IWatch[]> {
    return this.http.get<IWatch[]>(`${BASE_URL}/watches`);
  }

  loadWatchById$(id: string): Observable<IWatch> {
    return this.http.get<IWatch>(`${BASE_URL}/watches/${id}`);
  }

  addWatch$(body: {
    brand: string;
    model: string;
    price: number;
    imageUrl: string;
    summary: string;
  }): Observable<IWatch> {
    return this.http.post<IWatch>(`${BASE_URL}/watches`, body);
  }
}
