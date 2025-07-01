import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storage.getItem<string>('access_token');
    if (token) {
      const cloned = req.clone({
        setHeaders: {
         'X-Authorization': `${token}`,
        },
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
} 