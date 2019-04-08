import { PostService } from './../services/post.service';
import { Injectable } from '@angular/core';
import { IPostInfo } from '../models';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchPostResolver implements Resolve<IPostInfo> {

  constructor(private postService: PostService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<IPostInfo> {
    return this.postService.getById(route.params.id);
  }
}
