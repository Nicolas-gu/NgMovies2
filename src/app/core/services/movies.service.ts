import { HttpClient, httpResource } from "@angular/common/http";
import { inject, Injectable, Signal } from "@angular/core";
import { MovieIndex } from "../models/movie.model";
import { environment } from "../../../environments/environment.development";

@Injectable({ providedIn: 'root'})
export class MovieService {

    private readonly _httpclient = inject(HttpClient)

    getCategory(page: Signal<number>, category: Signal<string>) {
        //return this._httpclient.get<MovieIndex>(environment.TMBD_URL + '/movie/popular')
        return httpResource<MovieIndex>(() => ({
            url: environment.TMBD_URL + '/movie/' + category(), 
            params: { page: page() }
        }))
    }
        
    
    
}