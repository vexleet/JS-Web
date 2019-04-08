import { ToastrService } from 'ngx-toastr';
import {
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { APP_KEY, APP_SECRET } from 'src/app/kinvey.tokens';


@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService, private authService: AuthService) { }

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

        return next.handle(request)
            .pipe(catchError((err: HttpErrorResponse) => {
                console.log(err);
                if (err.status === 401 && err.url.includes('login')) {
                    this.toastr.error('Invalid email or password');
                }
                if (err.status === 409) {
                    this.toastr.error('This username is already taken');
                }

                return throwError(err);
            }));
    }
}
