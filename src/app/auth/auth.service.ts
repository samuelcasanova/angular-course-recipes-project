import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";

@Injectable({ providedIn: 'root'})
export class AuthService {
  userSubject = new BehaviorSubject<User | null>(null)

  constructor(private httpClient: HttpClient) {}

  signUp(email: string, password: string) {
    const payload = { email, password, returnSecureToken: true }
    return this.httpClient
      .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBu0_c21_FWKHGpNytOYFfUNwXUQLUMq7Y', payload)
      .pipe(catchError(this.handleError.bind(this)), tap(this.handleAuthentication.bind(this)))
  }

  login(email: string, password: string) {
    const payload = { email, password, returnSecureToken: true }
    return this.httpClient
      .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBu0_c21_FWKHGpNytOYFfUNwXUQLUMq7Y', payload)
      .pipe(catchError(this.handleError.bind(this)), tap(this.handleAuthentication.bind(this)))
  }

  private handleError(errorResponse: HttpErrorResponse) {
    switch(errorResponse.error?.error?.message) {
      case 'EMAIL_EXISTS':
        return throwError(() => new Error('The email already exists'))
      case 'INVALID_LOGIN_CREDENTIALS':
        return throwError(() => new Error('Email or password incorrect'))
      default:
        return throwError(() => new Error('Unknown error'))
    }
  }

  private handleAuthentication(responseData: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000)
    const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate)
    this.userSubject.next(user)
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