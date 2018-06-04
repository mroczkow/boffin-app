import { Component, OnInit, Input } from '@angular/core';

import { ArtistsService } from '../artists.service';
import { Artist } from '../artist';

@Component({
  selector: 'app-artists-grid',
  templateUrl: './artists-grid.component.html',
  styleUrls: ['./artists-grid.component.css']
})
export class ArtistsGridComponent implements OnInit {
  @Input() artists: Artist[];
  lazyImageObserver: IntersectionObserver;

  constructor(private artistsService: ArtistsService) { }

  ngOnInit() {
    this.initLazyImageObserver();
  }

  onArtistSelected(artist: Artist) {
    this.artistsService.addSelectedArtist(artist);
  }

  private initLazyImageObserver() {
    if ('IntersectionObserver' in window) {
      this.lazyImageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage['src'] = lazyImage['alt'];
            lazyImage.classList.remove('lazy');

            observer.unobserve(lazyImage);
          }
        });
      });
    }
  }
}
