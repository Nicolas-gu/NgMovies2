import { Component, inject, input, signal } from '@angular/core';
import { MovieService } from '../../core/services/movies.service';

@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss'
})
export class MovieList {

  private readonly movieservice = inject(MovieService);
  page = signal(1)
  category = input.required<string>()
  movieList = this.movieservice.getCategoryPage(this.page, this.category)

 

  nextPage(){
    this.page.update(p => p + 1)
  }
  previousPage(){
    if(this.page() > 1){
      this.page.update(p => p - 1)
    }
  }

  
}
