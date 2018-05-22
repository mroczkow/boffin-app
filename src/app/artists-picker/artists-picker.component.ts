import { Component, OnInit } from '@angular/core';
import { ArtistsService } from './artists.service';
import { Artist } from './artist';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-artists-picker',
  templateUrl: './artists-picker.component.html',
  styleUrls: ['./artists-picker.component.css']
})
export class ArtistsPickerComponent implements OnInit {
  selectedYear: string;
  filterString: string = '';

  years: Observable<string []>;
  artistsToDisplay: Observable<Artist []>

  constructor(private artistsService: ArtistsService) { }

  ngOnInit() {
    this.years = this.artistsService.getYears();
    this.artistsToDisplay = this.artistsService.getArtistsForYear(this.selectedYear);
  }

  onTabSelected(year) {
    this.selectedYear = year;
    this.artistsToDisplay = this.artistsService.getArtistsForYear(this.selectedYear);
  }

  onGetPredictions() {
    console.log(this.artistsService.getSelectedArtists());
  }
}
