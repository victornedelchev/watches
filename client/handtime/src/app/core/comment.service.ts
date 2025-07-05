import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IComment } from './interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  BASE_COMMENT_URL = environment.BASE_COMMENTS_URL;

  constructor(private http: HttpClient) { }

  createComment$(watchId: string, comment: string): Observable<IComment> {
    return this.http.post<IComment>(`${this.BASE_COMMENT_URL}`, { watchId, comment });
  }

  getAllComments$(watchId: string): Observable<IComment[]> {
    const params = new URLSearchParams({
      where: `watchId="${watchId}"`,
      load: `author=_ownerId:users`,
    });

    return this.http.get<IComment[]>(`${this.BASE_COMMENT_URL}?${params.toString()}`);
  }

  getCommentById$(commentId: string): Observable<IComment> {
    const params = new URLSearchParams({
      load: `author=_ownerId:users`,
    });

    return this.http.get<IComment>(`${this.BASE_COMMENT_URL}/${commentId}?${params.toString()}`);
  }

  editCommentById$(watchId: string, commentId: string, comment: string): Observable<IComment> {
    return this.http.put<IComment>(`${this.BASE_COMMENT_URL}/${commentId}`, {watchId, comment });
  }

  deleteCommentById$(commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_COMMENT_URL}/${commentId}`);
  }
}
