import { MovieDetails } from './../models';
import { Injectable } from '@angular/core';
import { Movie } from '../models';
import { HttpClient } from '@angular/common/http';

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "&api_key=36a82c7af08227aa586155487a9c4c43";
const API_KEY_ALT = "?api_key=36a82c7af08227aa586155487a9c4c43";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  popularEndPoint = "/discover/movie?sort_by=popularity.desc";
  theatersEndPoint = "/discover/movie?primary_release_date.gte=2018-07-15&primary_release_date.lte=2019-02-01";
  kidsEndPoint = "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc";
  dramaEndPoint = "/discover/movie?with_genres=18&primary_release_year=2019&sort_by=popularity.desc";
  searchMovieEndPoint = "/search/movie";

  constructor(private http: HttpClient) { }

  getPopular() {
    return this.http.get<Movie[]>(BASE_URL + this.popularEndPoint + API_KEY);
  }

  getTheaters() {
    return this.http.get<Movie[]>(BASE_URL + this.theatersEndPoint + API_KEY);
  }

  getKids() {
    return this.http.get<Movie[]>(BASE_URL + this.kidsEndPoint + API_KEY);
  }

  getDrama() {
    return this.http.get<Movie[]>(BASE_URL + this.dramaEndPoint + API_KEY);
  }

  getMovie(id: string) {
    return this.http.get<MovieDetails>(BASE_URL + `/movie/${id}` + API_KEY_ALT);
  }

  searchMovie(movieName: string) {
    return this.http.get<Movie[]>(BASE_URL + this.searchMovieEndPoint + `?query=${movieName}` + API_KEY);
  }

}
