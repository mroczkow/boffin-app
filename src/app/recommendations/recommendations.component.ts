import { Component, OnInit } from '@angular/core';

import { ArtistsService } from '../artists-picker/artists.service';
import { Artist } from '../artists-picker/artist';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  // recommendedArtists: string [];
  recommendedArtists: any;
  recommendedArtistsNames: any;

  constructor(private artistsService: ArtistsService) { }

  ngOnInit() {
    this.artistsService.send().subscribe(response => {
      console.log(response);
      this.recommendedArtistsNames = Object.keys(response['recommendation']);
      this.recommendedArtists = response['recommendation'];
    });
  }
}
