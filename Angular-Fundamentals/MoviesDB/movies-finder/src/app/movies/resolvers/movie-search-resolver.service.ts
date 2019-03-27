import { Movie } from './../models/movies';
import { MoviesService } from '../service/movies.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchResolver {

  constructor(private moviesService: MoviesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie[]> {
    const movieName = route.queryParamMap.get("search");

    return this.moviesService.searchMovie(movieName);
  }
}
