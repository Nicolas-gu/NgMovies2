import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  if(req.url.startsWith(environment.TMBD_URL)){
    req = req.clone({
      // ajoute automatiquement le token dans les headers de la requete
      setHeaders: { 'Authorization': 'Bearer ' + environment.API_TOKEN},
      setParams: { 'language': 'fr-FR'}
    })
  }

  return next(req);
};
