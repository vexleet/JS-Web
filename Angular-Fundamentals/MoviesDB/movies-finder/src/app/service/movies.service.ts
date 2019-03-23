import { Injectable } from '@angular/core';
import { Movie } from '../models';
import { HttpClient } from '@angular/common/http';

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "&api_key=36a82c7af08227aa586155487a9c4c43";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  popularEndPoint = "/discover/movie?sort_by=popularity.desc";
  theatersEndPoint = "/discover/movie?primary_release_date.gte=2018-07-15&primary_release_date.lte=2019-02-01";

  constructor(private http: HttpClient) { }

  getPopular(){
    return this.http.get<Movie[]>(BASE_URL + this.popularEndPoint + API_KEY);
  }

  getTheaters() {
    return this.http.get<Movie[]>(BASE_URL + this.theatersEndPoint + API_KEY);
  }
}
