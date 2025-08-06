import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ILike } from './interfaces/like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  BASE_LIKE_URL = environment.BASE_LIKE_URL;

  constructor(private http: HttpClient) { }

  likeWatch$(watchId: string): Observable<ILike>{
    return this.http.post<ILike>(`${this.BASE_LIKE_URL}`, { watchId });
  }

  unlikeWatch$(watchId: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_LIKE_URL}/${watchId}`);
  }

  getAllLikes$(watchId: string): Observable<ILike[]>{
    const params = new URLSearchParams({where: `watchId="${watchId}"`});

    return this.http.get<ILike[]>(`${this.BASE_LIKE_URL}?${params.toString()}`);
  }
}
