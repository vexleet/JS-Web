import { Movie } from './../models/movies';
import { MoviesService } from './../service/movies.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  matchedMovies$: Observable<Movie[]>;

  constructor(private router: Router, private route: ActivatedRoute,
    private movieService: MoviesService) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      this.movieService.searchMovie(queryParams.get("search")).subscribe(res => {
        this.matchedMovies$ = res["results"];
      });
    });
  }
}
