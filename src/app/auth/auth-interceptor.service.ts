import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.userSubject.pipe(take(1), exhaustMap(user => {
      if (!user) {
        return next.handle(request)
      }
      const modifiedRequest = request.clone({ headers: new HttpHeaders({ auth: user.token })})
      return next.handle(modifiedRequest)
    }))
  }
}