import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { ArtistsService } from './artists-picker/artists.service';
import { LocalStorageService } from './shared/local-storage.service';
import { ConfirmSnackBarComponent } from './shared/confirm-snack-bar/confirm-snack-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private localStorageService: LocalStorageService, private artistService: ArtistsService,
              private router: Router, private snackBar: MatSnackBar) { }

  onSaveUserTaste() {
    this.artistService.saveInLocalStorage();
    this.showConfirmation('Done!');
  }

  onClearUserTaste() {
    this.localStorageService.clearLocalStorage();
    this.artistService.updateStoredDate();
    this.showConfirmation('Done!');
  }

  showConfirmation(message: string) {
    this.snackBar.openFromComponent(ConfirmSnackBarComponent, {
      data: message,
      duration: 500
    });
  }

  isHomePage() {
    return this.router.url.length === 1;
  }
}
