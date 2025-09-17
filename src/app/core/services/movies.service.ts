import { HttpClient, httpResource } from "@angular/common/http";
import { inject, Injectable, Signal } from "@angular/core";
import { MovieIndex, Root } from "../models/movie.model";
import { environment } from "../../../environments/environment.development";

@Injectable({ providedIn: 'root'})
export class MovieService {

    private readonly _httpclient = inject(HttpClient)

    getCategoryPage(page: Signal<number>, category: Signal<string>) {
        //return this._httpclient.get<MovieIndex>(environment.TMBD_URL + '/movie/popular')
        return httpResource<MovieIndex>(() => ({
            url: environment.TMBD_URL + '/movie/' + category(), 
            params: { page: page(), language: 'fr-FR', include_adult: false }
        }))
    }
    getCategory(category: Signal<string>) {
        return httpResource<MovieIndex>(() => ({
            url: environment.TMBD_URL + '/movie/' + category(),
            params: { language: 'fr-FR', include_adult: false }
        }))
    }
    getMovie(movieId: Signal<string>){
        return httpResource<Root>(() => ({
            url: environment.TMBD_URL + '/movie/' + movieId(),
            params: { language: 'fr-FR', include_adult: false }
        }))
    }
        
    
    
}