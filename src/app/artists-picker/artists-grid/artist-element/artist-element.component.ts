import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';

import { Artist } from '../../artist';

@Component({
  selector: 'app-artist-element',
  templateUrl: './artist-element.component.html',
  styleUrls: ['./artist-element.component.css']
})
export class ArtistElementComponent implements OnInit {
  @Input() artist: Artist;
  @Input() imageObserver: IntersectionObserver;
  @ViewChild('artistImage') artistImage: ElementRef;

  loaded = false;

  constructor() { }

  ngOnInit() {
    this.imageObserver.observe(this.artistImage.nativeElement);
  }


}
