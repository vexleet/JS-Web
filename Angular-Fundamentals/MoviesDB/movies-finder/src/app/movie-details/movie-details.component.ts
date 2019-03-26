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
  movie$: MovieDetails;
  movieId: string;

  constructor(private route: ActivatedRoute,
    private moviesService: MoviesService) {
    this.movieId = route.snapshot.params["id"];
  }

  ngOnInit() {
    this.moviesService.getMovie(this.movieId).subscribe(res => {
      this.movie$ = res;
    });
  }

}
