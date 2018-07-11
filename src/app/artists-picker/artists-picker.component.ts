import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import { ArtistsService } from './artists.service';
import { Artist } from './artist';

@Component({
  selector: 'app-artists-picker',
  templateUrl: './artists-picker.component.html',
  styleUrls: ['./artists-picker.component.css']
})
export class ArtistsPickerComponent implements OnInit {
  @ViewChild('artistGrid') artistGrid: ElementRef;

  selectedYear = 'All';
  filterString = '';
  loaded = false;
  showSelected = false;
  years: string [];
  artistsToDisplay: Artist[];
  artistsData: {};

  constructor(private artistsService: ArtistsService, private router: Router) { }

  ngOnInit() {
    this.artistsService.getHistoricData().subscribe(data => {
      this.artistsData = data;
      this.artistsToDisplay = this.artistsData[this.selectedYear];
      this.years = Object.keys(data).reverse();
      this.loaded = true;
    });
  }

  onTabSelected(tabNumber: number) {
    this.selectedYear = this.years[tabNumber];
    this.setArtistsToDisplay();

    this.artistGrid.nativeElement.scroll(0, 0);
  }

  onGetRecommendations() {
    this.artistsService.send();
    this.router.navigate(['recommendations']);
  }

  onToggleSelectedArtists() {
    this.showSelected = !this.showSelected;
    this.setArtistsToDisplay();
  }

  private setArtistsToDisplay() {
    if (this.showSelected) {
      const selectedArtistNames = this.artistsService.getSelectedArtistsNames();
      this.artistsToDisplay = this.artistsData[this.selectedYear].filter(artist => {
        return selectedArtistNames.indexOf(artist.name) !== -1;
      });
    } else {
      this.artistsToDisplay = this.artistsData[this.selectedYear];
    }
  }
}
