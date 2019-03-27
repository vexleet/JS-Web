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

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.matchedMovies$ = data["movie"]["results"];
    });
  }

  ngOnInit() { }
}
