import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(authForm: NgForm) {
    console.log(authForm.value)
    const { email, password } = authForm.value
    this.authService.signUp(email, password).subscribe(
      authResponseData => {
        console.log(authResponseData)
      },
      error => {
        console.error(error)
      }
    )
    authForm.reset()
  }
}