import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistsService } from '../artists.service';
import { Artist } from '../artist';

@Component({
  selector: 'app-artists-grid',
  templateUrl: './artists-grid.component.html',
  styleUrls: ['./artists-grid.component.css']
})
export class ArtistsGridComponent implements OnInit {
  @Input() artists: Artist[]

  constructor(private artistsService: ArtistsService) { }

  ngOnInit() {
  }

  onArtistSelected(artist: Artist) {
    this.artistsService.addSelectedArtist(artist); 
    //todo change style
  }

}
