import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Artist } from '../../artist';
import { ArtistsService } from '../../artists.service';
import {animate, group, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-artist-element',
  templateUrl: './artist-element.component.html',
  styleUrls: ['./artist-element.component.css'],
  animations: [
    trigger('fullHeartState', [
      state('not-visible', style({
        opacity: '0'
      })),
      state('selected', style({
        top: 'calc(0% + 20px)',
        left: 'calc(100% - 20px)',
        fontSize: '20px',
        opacity: '1'
      })),
      state('hover-selected', style({
        opacity: '1'
      })),
      transition('selected <=> hover-selected', animate('0.2s ease')),
      transition('hover-selected => not-visible', animate('0.2s 100ms ease-in')),
      transition('not-visible => selected', [
        group([
          animate('0.2s', style({
            opacity: '1'
          })),
          animate('0.2s 150ms', style({
            top: 'calc(0% + 20px)',
            left: 'calc(100% - 20px)',
            fontSize: '20px'
          }))
        ])
      ]),
      transition('selected => not-visible',
        group([
          animate('0.2s', style({
            top: '50%',
            left: '50%',
            fontSize: '36px'
          })),
          animate('0.2s 200ms', style({
            opacity: '0'
          }))
        ]))
    ]),
    trigger('emptyHeartState', [
      state('visible', style({
        opacity: '1'
      })),
      state('not-visible', style({
        opacity: '0'
      })),
      state('unselected', style({
        opacity: '1'
      })),
      state('hover-selected', style({
        opacity: '1'
      })),
      transition('not-visible => unselected', animate('10ms 200ms')),
      transition('not-visible => hover-selected', animate('10ms 200ms'))
    ])
  ]
})
export class ArtistElementComponent implements OnInit {
  @Input() artist: Artist;
  @Input() imageObserver: IntersectionObserver;

  @ViewChild('artistImage') artistImage: ElementRef;

  isSelected: boolean ;
  fullHeartState = 'not-visible';
  emptyHeartState = 'not-visible';

  constructor(private artistsService: ArtistsService) { }

  ngOnInit() {
    this.imageObserver.observe(this.artistImage.nativeElement);
    this.isSelected = this.artistsService.isSelected(this.artist.name);
  }

  onArtistSelected() {
    if (this.isSelected) {
      this.artistsService.removeArtistFromSelected(this.artist.name);
      this.fullHeartState = 'not-visible';
      this.emptyHeartState = 'unselected';
    } else {
      this.artistsService.addArtistNameToSelected(this.artist.name);
      this.fullHeartState = 'selected';
      this.emptyHeartState = 'not-visible';
    }
    this.isSelected = !this.isSelected;
  }

  animationDone($event) {
    console.log($event);
  }

  onMouseEnter() {
    if (this.isSelected) {
      this.fullHeartState = 'hover-selected';
      this.emptyHeartState = 'hover-selected';
    } else {
      this.emptyHeartState = 'visible';
      this.fullHeartState = 'not-visible';
    }
  }

  onMouseLeave() {
    if (this.isSelected) {
      this.fullHeartState = 'selected';
      this.emptyHeartState = 'not-visible';
    } else {
      this.fullHeartState = 'not-visible';
      this.emptyHeartState = 'not-visible';
    }
  }
}
