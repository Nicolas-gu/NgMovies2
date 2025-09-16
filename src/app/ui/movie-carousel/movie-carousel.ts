import { Component, ElementRef, inject, input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MovieService } from '../../core/services/movies.service';
import { CommonModule } from '@angular/common';
import { CategoyPipe } from '../../core/services/categoy-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-carousel',
  imports: [CommonModule, CategoyPipe, RouterLink],
  templateUrl: './movie-carousel.html',
  styleUrl: './movie-carousel.scss'
})
export class MovieCarousel implements OnInit, OnDestroy {

  private readonly movieservice = inject(MovieService);
  category = input.required<string>()
  movieList = this.movieservice.getCategory(this.category)
  @ViewChild('carousel', { static: true }) carouselRef!: ElementRef<HTMLElement>;
  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;
  

  ngOnInit() {
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);
  }

  ngOnDestroy() {
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseDown = (event: MouseEvent) => {
    if (event.button !== 0) return;
    this.isDown = true;
    const carousel = this.carouselRef.nativeElement;
    this.startX = event.pageX - carousel.offsetLeft;
    this.scrollLeft = carousel.scrollLeft;
    
    carousel.classList.add('dragging');
  };

  onMouseUp = () => {
    if (!this.isDown) return;
    this.isDown = false;
    this.carouselRef.nativeElement.classList.remove('dragging');
  };

   onMouseMove = (event: MouseEvent) => {
    if (!this.isDown || event.buttons !== 1) return;
    event.preventDefault();
    const carousel = this.carouselRef.nativeElement;
    const x = event.pageX - carousel.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    carousel.scrollLeft = this.scrollLeft - walk;
  };
}
