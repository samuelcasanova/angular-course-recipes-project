import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true
  isLoading = false
  error = null

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(authForm: NgForm) {
    this.isLoading = true
    console.log(authForm.value)
    const { email, password } = authForm.value
    let authObservable: Observable<AuthResponseData>
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password)
    } else {
      authObservable = this.authService.signUp(email, password)
    }
    authObservable.subscribe(
      authResponseData => {
        console.log(authResponseData)
        this.isLoading = false
      },
      error => {
        console.error(error)
        this.error = error.message
        this.isLoading = false
      })
    authForm.reset()
  }
}