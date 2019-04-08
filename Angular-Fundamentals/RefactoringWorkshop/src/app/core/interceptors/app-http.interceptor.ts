import {
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { APP_KEY, APP_SECRET } from 'src/app/kinvey.tokens';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Basic ${btoa(`${APP_KEY}:${APP_SECRET}`)}`,
            }
        });
        if (
            request.url.includes('posts')
            || request.url.includes('comments')
            || request.url.includes('logout')) {
            const token = this.authService.token;
            request = request.clone({
                setHeaders: {
                    Authorization: `Kinvey ${token}`,
                }
            });
        }

        return next.handle(request);
    }
}
