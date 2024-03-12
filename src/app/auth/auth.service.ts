import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

@Injectable({ providedIn: 'root'})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signUp(email: string, password: string) {
    const payload = { email, password, returnSecureToken: true }
    return this.httpClient
      .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBu0_c21_FWKHGpNytOYFfUNwXUQLUMq7Y', payload)
      .pipe(catchError(errorResponse => {
        switch(errorResponse.error?.error?.message) {
          case 'EMAIL_EXISTS':
            return throwError(() => new Error('The email already exists'))
          default:
            return throwError(() => new Error('Unknown error'))
        }
      }))
  }

  login(email: string, password: string) {
    const payload = { email, password, returnSecureToken: true }
    return this.httpClient
      .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBu0_c21_FWKHGpNytOYFfUNwXUQLUMq7Y', payload)
      .pipe(catchError(errorResponse => {
        switch(errorResponse.error?.error?.message) {
          case 'EMAIL_EXISTS':
            return throwError(() => new Error('The email already exists'))
          default:
            return throwError(() => new Error('Unknown error'))
        }
      }))
  }
}

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string, 
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: string
}