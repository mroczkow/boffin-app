import { Component, OnInit } from '@angular/core';
import { ArtistsService } from '../artists-picker/artists.service';
import { Artist } from '../artists-picker/artist';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  recommendedArtists: Artist [];

  constructor(private artistsService: ArtistsService) { }

  ngOnInit() {
    this.recommendedArtists = this.artistsService.getSelectedArtists();
  }
}
