import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router} from '@angular/router';

import {ArtistsService} from '../../artists-picker/artists.service';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html'
})
export class SaveDialogComponent implements OnInit {
  title: string;
  description: string;

  constructor(private dialogRef: MatDialogRef<SaveDialogComponent>, private router: Router,
              private artistService: ArtistsService) { }

  ngOnInit() {
    this.title = 'Would you like to save your choice?';
    this.description = 'Selected artists and your recommendation will be saved on this device.';
  }

  close() {
    this.dialogRef.close();
    this.router.navigate(['recommendations']);
  }

  save() {
    this.artistService.saveInLocalStorage();
    this.close();
  }
}
