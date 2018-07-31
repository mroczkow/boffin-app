import { Component } from '@angular/core';
import { MatDialog, MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';

import { ArtistsService } from './artists-picker/artists.service';
import { LocalStorageService } from './shared/local-storage.service';
import { ConfirmSnackBarComponent } from './shared/confirm-snack-bar/confirm-snack-bar.component';
import { LegendDialogComponent } from './shared/legend-dialog/legend-dialog.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private localStorageService: LocalStorageService, private artistService: ArtistsService,
              private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  onSaveUserTaste() {
    this.artistService.saveInLocalStorage();
    this.showConfirmation('Done!');
  }

  onClearUserTaste() {
    const dialogData = {
      title: 'Would you like to clear your choice?',
      description: 'Selected artists and your recommendation will be deleted from this device.'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.localStorageService.clearLocalStorage();
        this.artistService.updateStoredDate();
        this.showConfirmation('Done!');
      } else {
        this.showConfirmation('Canceled');
      }
    });
  }

  onShowLegend() {
    this.dialog.open(LegendDialogComponent);
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

  isRecommendationPage() {
    return this.router.url.includes('recommendations');
  }
}
