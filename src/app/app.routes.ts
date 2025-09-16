import { Routes } from '@angular/router';
import { MovieList } from './ui/movie-list/movie-list';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full'},
    // component lazy loaded
    { path: 'home', loadComponent: () => import('./ui/home/home').then(c => c.Home)},
    { path: 'movies/:category', component: MovieList},
    { path: 'movie/:id', loadComponent: () => import('./ui/movie/movie').then(c => c.Movie)}



];
