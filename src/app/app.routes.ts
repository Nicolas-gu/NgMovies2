import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full'},
    // component lazy loaded
    { path: 'home', loadComponent: () => import('./ui/home/home').then(c => c.Home)}

];
