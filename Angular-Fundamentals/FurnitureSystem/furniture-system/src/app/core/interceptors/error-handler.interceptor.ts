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
import { Injector, Injectable } from '@angular/core';
import { Router } from '@angular/router';

const API_URL = "http://localhost:5000";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("token");

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            }
        });

        return next.handle(request)
            .pipe(catchError((err: HttpErrorResponse) => {
                if (err.status === 400 || err.status === 401) {
                    for (const key in err.error.errors) {
                        if (err.error.errors.hasOwnProperty(key)) {
                            this.toastr.error(err.error.errors[key]);
                        }
                    }
                }
                if (err.status === 401 && request.url.includes('login')) {
                    this.toastr.error(err.error.message);
                }

                return throwError(err);
            }));
    }
}
