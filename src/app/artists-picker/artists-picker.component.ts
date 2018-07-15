import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { ArtistsService } from './artists.service';
import { Artist } from './artist';
import { SaveDialogComponent } from '../shared/save-dialog/save-dialog.component';

@Component({
  selector: 'app-artists-picker',
  templateUrl: './artists-picker.component.html',
  styleUrls: ['./artists-picker.component.css']
})
export class ArtistsPickerComponent implements OnInit {
  @ViewChild('artistGrid') artistGrid: ElementRef;

  years: string [];
  artistsToDisplay: Artist[];
  artistsData: {};

  selectedYear = '2017';
  filterString = '';
  loaded = false;
  showSelected = false;

  constructor(private artistsService: ArtistsService, private dialog: MatDialog) { }

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
    this.openDialog();
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

  private openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    this.dialog.open(SaveDialogComponent, dialogConfig);
  }
}
