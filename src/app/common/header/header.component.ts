import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false
  private userSubscription: Subscription

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.userSubject.subscribe(user => {
      this.isAuthenticated = !!user
    })
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
  }

  onFetchData() {
    this.dataStorageService.fetchData().subscribe()
  }
}