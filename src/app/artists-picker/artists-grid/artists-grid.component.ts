import { Component, OnInit, Input } from '@angular/core';

import { Artist } from '../artist';

@Component({
  selector: 'app-artists-grid',
  templateUrl: './artists-grid.component.html',
  styleUrls: ['./artists-grid.component.css']
})
export class ArtistsGridComponent implements OnInit {
  @Input() artists: Artist[];

  lazyImageObserver: IntersectionObserver;

  constructor() { }

  ngOnInit() {
    this.initLazyImageObserver();
  }

  private initLazyImageObserver() {
    if ('IntersectionObserver' in window) {
      this.lazyImageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage['src'] = lazyImage['alt'];
            lazyImage.classList.remove('lazy');
            lazyImage.classList.add('loading');

            observer.unobserve(lazyImage);
          }
        });
      });
    }
  }
}
