import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs/index';

import { Artist } from './artist';

@Injectable()
export class ArtistsService {
  recommendationsReady = new Subject<{[artistName: string]: number}>();

  private selectedArtists: string[] = [];

  constructor(private http: HttpClient) {}

  getHistoricData(): Observable<Object> {
    return this.http.get('assets/artists.json').pipe(
      map(data => {
        delete data[2018];
        data['All'] = this.getAllArtists(data);

        return data;
      })
    );
  }

  addArtistNameToSelected(artistName: string) {
    if (!this.isSelected(artistName)) {
      this.selectedArtists.push(artistName);
    }
  }

  removeArtistFromSelected(artistName: string) {
    const artistIndex = this.selectedArtists.indexOf(artistName);
    this.selectedArtists.splice(artistIndex, 1);
  }

  isSelected(artistName: string): boolean {
    return this.selectedArtists.indexOf(artistName) !== -1;
  }

  getSelectedArtistsNames(): string[] {
    return this.selectedArtists;
  }

  send() {
    const chosenArtists = {'chosenArtists': this.selectedArtists};
    const httpOptions = {headers: new HttpHeaders({'Content-Type':  'application/json'})};

    localStorage.setItem('recommendation', null);

    this.http.post('https://boffin-api.herokuapp.com/api/recommend', chosenArtists, httpOptions).subscribe(response => {
      this.recommendationsReady.next(response['recommendation']);
      localStorage.setItem('recommendation', JSON.stringify(response['recommendation']));
    });
  }

  private getAllArtists(data): Artist[] {
    let allArtists = [];
    Object.keys(data).forEach(year => {
      allArtists = allArtists.concat(data[year]);
    });

    return this.getSortedArtists(this.removeDuplicates(allArtists));
  }

  private getSortedArtists(artists: Artist[]): Artist[] {
    return artists.sort((artist1, artist2) => {
      const name1 = artist1.name.toUpperCase();
      const name2 = artist2.name.toUpperCase();

      return (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0;
    });
  }

  private removeDuplicates(artists: Artist[]): Artist[] {
    return artists.filter((object, index, array) => {
      return array.map(mapObj => mapObj.name).indexOf(object.name) === index;
    });
  }
}
