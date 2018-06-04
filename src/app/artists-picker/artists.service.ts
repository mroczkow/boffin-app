import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Artist } from './artist';

@Injectable()
export class ArtistsService {
  private selectedArtists: Artist[] = [];

  constructor(private http: HttpClient) {}

  getHistoricData() {
    return this.http.get('assets/artists.json').pipe(
      map(data => {
        delete data[2018];
        data['All'] = this.getAllArtists(data);

        return data;
      })
    );
  }

  addSelectedArtist(artist: Artist) {
    this.selectedArtists.push(artist);
  }

  getSelectedArtists(): Artist[] {
    return this.selectedArtists;
  }

  private getAllArtists(data) {
    let allArtists = [];
    Object.keys(data).forEach(year => {
      allArtists = allArtists.concat(data[year]);
    });

    return this.getSortedArtists(this.removeDuplicates(allArtists));
  }

  private getSortedArtists(artists: Artist[]) {
    return artists.sort((artist1, artist2) => {
      const name1 = artist1.name.toUpperCase();
      const name2 = artist2.name.toUpperCase();

      return (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0;
    });
  }

  private removeDuplicates(artists: Artist[]) {
    return artists.filter((object, index, array) => {
      return array.map(mapObj => mapObj.name).indexOf(object.name) === index;
    });
  }
}
