import { MovieDetailsResolver } from './movies/resolvers/movie-details-resolver.service';
import { MoviesResolver } from './movies/resolvers/movies-resolver.service';
import { MovieSearchComponent } from './movies/movie-search/movie-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies-list/movies-list.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { MovieSearchResolver } from './movies/resolvers/movie-search-resolver.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MoviesComponent,
    resolve: {
      movies: MoviesResolver,
    }
  },
  {
    path: 'movie/:id',
    component: MovieDetailsComponent,
    resolve: {
      movieInfo: MovieDetailsResolver,
    }
  },
  {
    path: 'search/movie',
    component: MovieSearchComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      movie: MovieSearchResolver,
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [
    MoviesResolver,
    MovieDetailsResolver,
    MovieSearchResolver],
})
export class AppRoutingModule { }
