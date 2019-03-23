import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models';
import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  popular$: Observable<Movie[]>
  theaters$: Observable<Movie[]>

  constructor(private movieService: MoviesService) {
  }

  ngOnInit() {
    this.movieService.getPopular().subscribe((res) => {
      this.popular$ = res['results'];
    });

    this.movieService.getTheaters().subscribe((res) => {
      this.theaters$ = res['results'];
    });
  }

}