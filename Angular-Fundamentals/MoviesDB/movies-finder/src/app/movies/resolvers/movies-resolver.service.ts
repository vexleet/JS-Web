import { MoviesService } from '../service/movies.service';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { Movie } from '../models';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MoviesResolver {

  constructor(private moviesService: MoviesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie[][]> {
    return zip(
      this.moviesService.getPopular(),
      this.moviesService.getTheaters(),
      this.moviesService.getKids(),
      this.moviesService.getDrama(),
    );
  }
}
