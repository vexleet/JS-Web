import {
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http'
import { Observable } from 'rxjs';

const API_URL = "http://localhost:5000";

export class AppHttpInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("token");

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            }
        });

        return next.handle(request.clone({
            url: `${API_URL}/${request.url}`
        }));
    }

}
