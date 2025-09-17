import { Component, inject, input, signal } from '@angular/core';
import { MovieService } from '../../core/services/movies.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  imports: [RouterLink],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss'
})
export class MovieList {

  private readonly movieservice = inject(MovieService);
  private route = inject(ActivatedRoute)
  page = signal(1)
  category = signal<string>("");
  movieList = this.movieservice.getCategoryPage(this.page, this.category)
  
  constructor(){
    this.category.set(this.route.snapshot.url[1].path);
    console.log(this.category)
  }
  
 

  nextPage(){
    this.page.update(p => p + 1)
    window.scrollTo({ top:0, behavior: 'smooth'})
  }
  previousPage(){
    if(this.page() > 1){
      this.page.update(p => p - 1)
      window.scrollTo({ top:0, behavior: 'smooth'})
    }
  }

  
}
