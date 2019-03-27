import { MoviesService } from './../service/movies.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetails } from '../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie$: Observable<MovieDetails>;
  movieId: string;

  constructor(private movieDetails: ActivatedRoute) {
    this.movieDetails.data.subscribe(data => {
      this.movie$ = data["movieInfo"];
    });
  }

  ngOnInit() { }

}
