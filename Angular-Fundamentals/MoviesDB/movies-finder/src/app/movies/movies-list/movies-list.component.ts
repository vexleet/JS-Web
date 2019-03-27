import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesComponent implements OnInit {
  popular$: Observable<Movie[]>;
  theaters$: Observable<Movie[]>;
  kids$: Observable<Movie[]>;
  drama$: Observable<Movie[]>;

  constructor(private movies: ActivatedRoute) {
    this.movies.data.subscribe(data => {
      this.popular$ = data.movies[0]["results"];
      this.theaters$ = data.movies[1]["results"];
      this.kids$ = data.movies[2]["results"];
      this.drama$ = data.movies[3]["results"];
    });
  }

  ngOnInit() { }
}