import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IWatch } from './interfaces/watch';
import { environment } from 'src/environments/environment.development';

const BASE_URL = environment.BASE_URL;
const SORTING_STRING_5 = environment.SORTING_STRING_5;
const SORTING_STRING_2 = environment.SORTING_STRING_2;

@Injectable({
  providedIn: 'root',
})
export class WatchService {
  constructor(private http: HttpClient) { }

  loadWatchList$(): Observable<IWatch[]> {
    return this.http.get<IWatch[]>(`${BASE_URL}/watches`);
  }

  loadLastWatchList$(): Observable<IWatch[]> {
    return this.http.get<IWatch[]>(`${BASE_URL}/watches${SORTING_STRING_5}`);
  }

  loadLastTwoWatchList$(): Observable<IWatch[]> {
    return this.http.get<IWatch[]>(`${BASE_URL}/watches${SORTING_STRING_2}`);
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

  editWatchById$(id: string, body: {
    brand: string;
    model: string;
    price: number;
    imageUrl: string;
    summary: string;
  }): Observable<IWatch> {
    return this.http.put<IWatch>(`${BASE_URL}/watches/${id}`, body);
  }


  deleteWatchById$(id: string): Observable<IWatch> {
    return this.http.delete<IWatch>(`${BASE_URL}/watches/${id}`);
  }
}
