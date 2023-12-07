import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() changedView = new EventEmitter<Views>()
  views = Views
  
  onViewChanged(newView: string) {
    this.changedView.emit(Views[newView])
  }
}

export enum Views {
  Recipes = 'Recipes',
  ShoppingList = 'ShoppingList'
}
