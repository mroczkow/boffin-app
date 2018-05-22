import { Component, OnInit, Input } from '@angular/core';
import { Artist } from '../../artist';

@Component({
  selector: 'app-artist-element',
  templateUrl: './artist-element.component.html',
  styleUrls: ['./artist-element.component.css']
})
export class ArtistElementComponent implements OnInit {
  @Input() artist: Artist;

  constructor() { }

  ngOnInit() {
  }
}
