import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signUp(email: string, password: string) {
    const payload = { email, password, returnSecureToken: true }
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBu0_c21_FWKHGpNytOYFfUNwXUQLUMq7Y', payload)
  }
}

interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string, 
  refreshToken: string,
  expiresIn: string,
  localId: string
}