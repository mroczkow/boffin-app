import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Artist } from '../../artist';
import { ArtistsService } from '../../artists.service';

@Component({
  selector: 'app-artist-element',
  templateUrl: './artist-element.component.html',
  styleUrls: ['./artist-element.component.css']
})
export class ArtistElementComponent implements OnInit {
  @Input() artist: Artist;
  @Input() imageObserver: IntersectionObserver;

  @ViewChild('artistImage') artistImage: ElementRef;

  isSelected: boolean ;

  constructor(private artistsService: ArtistsService) { }

  ngOnInit() {
    this.imageObserver.observe(this.artistImage.nativeElement);
    this.isSelected = this.artistsService.isSelected(this.artist.name);
  }

  onArtistSelected() {
    if (this.isSelected) {
      this.artistsService.removeArtistFromSelected(this.artist.name);
    } else {
      this.artistsService.addArtistNameToSelected(this.artist.name);
    }
    this.isSelected = !this.isSelected;
  }
}
