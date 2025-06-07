import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWatch } from './interfaces/watch';
import { environment } from 'src/environments/environment.development';

const apiUsr = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class WatchService {
  constructor(private http: HttpClient) {}

  loadWatchList(): Observable<IWatch[]> {
    return this.http.get<IWatch[]>(`${apiUsr}/watches`);
  }
}
