import { Component } from '@angular/core';
import { Views } from './common/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentView = Views.Recipes
  views = Views

  onChangedView(newView: Views) {
    this.currentView = newView
  }
}
