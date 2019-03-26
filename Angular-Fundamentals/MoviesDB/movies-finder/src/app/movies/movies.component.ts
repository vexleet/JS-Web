import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models';
import { MoviesService } from '../service/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  popular$: Observable<Movie[]>;
  theaters$: Observable<Movie[]>;
  kids$: Observable<Movie[]>;
  drama$: Observable<Movie[]>;
  matchedMovies$: Observable<Movie[]>;

  constructor(private movieService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.movieService.getPopular().subscribe(res => {
      this.popular$ = res['results'];
    });

    this.movieService.getTheaters().subscribe(res => {
      this.theaters$ = res['results'];
    });

    this.movieService.getKids().subscribe(res => {
      this.kids$ = res['results'];
    });

    this.movieService.getDrama().subscribe(res => {
      this.drama$ = res['results'];
    });
  }
}