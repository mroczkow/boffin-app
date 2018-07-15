import { Component } from '@angular/core';

import { ArtistsService } from './artists-picker/artists.service';
import { LocalStorageService } from './shared/local-storage.service';
import {TimetableService} from './recommendations/timetable.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private localStorageService: LocalStorageService, private artistService: ArtistsService) { }

  onSaveUserTaste() {
    this.artistService.saveInLocalStorage();
  }

  onClearUserTaste() {
    this.localStorageService.clearLocalStorage();
    this.artistService.updateStoredDate();
  }
}
