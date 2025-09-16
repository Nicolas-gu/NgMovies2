import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoy'
})
export class CategoyPipe implements PipeTransform {

  private translations: Record<string, string> = {
    "top_rated": "Mieux noté",
    "popular": "Populaire",
    "upcoming": "À venir",
    "now_playing": "En salle"
  };

  transform(value: string): string {
    return this.translations[value] || value;
  }

}
