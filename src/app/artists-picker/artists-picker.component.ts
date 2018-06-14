import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArtistsService } from './artists.service';
import { Artist } from './artist';

@Component({
  selector: 'app-artists-picker',
  templateUrl: './artists-picker.component.html',
  styleUrls: ['./artists-picker.component.css']
})
export class ArtistsPickerComponent implements OnInit {
  selectedYear = 'All';
  filterString = '';
  loaded = false;
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

  onTabSelected(year: string) {
    this.selectedYear = year;
    this.artistsToDisplay = this.artistsData[this.selectedYear];
  }

  onGetRecommendations() {
    console.log(this.artistsService.getSelectedArtists());
    // this.artistsService.send();
    this.router.navigate(['recommendations']);

  }
}
