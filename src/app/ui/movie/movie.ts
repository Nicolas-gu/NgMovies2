import { Component, inject, signal } from '@angular/core';
import { MovieService } from '../../core/services/movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  imports: [],
  templateUrl: './movie.html',
  styleUrl: './movie.scss'
})
export class Movie {

  private readonly movieservice = inject(MovieService);
  private route = inject(ActivatedRoute);
  movieId= signal<string>("");
  movie = this.movieservice.getMovie(this.movieId)

  constructor() {
   this.movieId.set(this.route.snapshot.paramMap.get('id')!)
   console.log(this.movieId())
  }
}
