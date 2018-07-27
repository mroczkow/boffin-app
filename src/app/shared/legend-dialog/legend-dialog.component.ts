import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-legend-dialog',
  templateUrl: './legend-dialog.component.html'
})
export class LegendDialogComponent implements OnInit {
  title: string;
  description: string;

  constructor(private dialogRef: MatDialogRef<LegendDialogComponent>) { }

  ngOnInit() {
    this.title = 'Here are your recommendations';
    this.description = 'The darker a color is, the greater a chance you will like the artist.';
  }

  close() {
    this.dialogRef.close();
  }
}
