import { MovieSearchComponent } from './movie-search/movie-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MoviesComponent,
  },
  {
    path: 'movie/:id',
    component: MovieDetailsComponent,
  },
  {
    path: 'search/movie',
    component: MovieSearchComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
