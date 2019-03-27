import { MovieDetails } from './../models/movie-details';
import { MoviesService } from '../service/movies.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsResolver {

  constructor(private moviesService: MoviesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieDetails> {
    let id = route.params["id"];

    return this.moviesService.getMovie(id);
  }
}
