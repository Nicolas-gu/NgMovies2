import { Component } from '@angular/core';
import { MovieList } from '../movie-list/movie-list';
import { MovieCarousel } from '../movie-carousel/movie-carousel';

@Component({
  selector: 'app-home',
  imports: [MovieList, MovieCarousel],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  

}
