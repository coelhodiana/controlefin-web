import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInteceptorService implements HttpInterceptor {
  constructor(private readonly _cognitoService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //
    return from(this._cognitoService.getSession()).pipe(
      switchMap((session) => {
        let jwttoken = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + session.idToken.jwtToken,
          },
        });
        return next.handle(jwttoken);
      })
    );
  }
}
