import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from "@angular/core";
import { CanLoad, UrlSegment, Router } from "@angular/router";
import { Route } from "@angular/compiler/src/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CanLoadPosts implements CanLoad {
    constructor(private authService: AuthService, private router: Router) { }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.token === null ? this.router.navigate(['/login']) : true;
    }
}