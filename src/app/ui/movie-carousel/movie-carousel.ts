import { Component, ElementRef, inject, input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MovieService } from '../../core/services/movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-carousel',
  imports: [CommonModule],
  templateUrl: './movie-carousel.html',
  styleUrl: './movie-carousel.scss'
})
export class MovieCarousel implements OnInit, OnDestroy {

  private readonly movieservice = inject(MovieService);
  category = input.required<string>()
  movieList = this.movieservice.getCategory(this.category)
  expandedCardId: number | null = null;
  @ViewChild('carousel', { static: true }) carouselRef!: ElementRef<HTMLElement>;
  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;
  private moved = false;

  ngOnInit() {
    // on attache globalement pour éviter les "blocages"
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);
  }

  ngOnDestroy() {
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  toggleExpand(id: number) {
    if (this.moved) {
      this.moved = false;
      return;
    }
    this.expandedCardId = this.expandedCardId === id ? null : id;
  }
  onMouseDown = (event: MouseEvent) => {
    if (event.button !== 0) return;
    this.isDown = true;
    const carousel = this.carouselRef.nativeElement;
    this.startX = event.pageX - carousel.offsetLeft;
    this.scrollLeft = carousel.scrollLeft;
    this.moved = false;
    carousel.classList.add('dragging');
  };

  onMouseUp = () => {
    if (!this.isDown) return;
    this.isDown = false;
    this.carouselRef.nativeElement.classList.remove('dragging');
  };

   onMouseMove = (event: MouseEvent) => {
    if (!this.isDown || event.buttons !== 1) return; // bouton doit être maintenu
    event.preventDefault();
    const carousel = this.carouselRef.nativeElement;
    const x = event.pageX - carousel.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    if (Math.abs(walk) > 5) {
      this.moved = true;
    }
    carousel.scrollLeft = this.scrollLeft - walk;
  };
}
