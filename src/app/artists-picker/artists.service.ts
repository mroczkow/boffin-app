import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators"
import { Artist } from "./artist";

@Injectable()
export class ArtistsService {

    private selectedArtists: Artist[] = []
   
    constructor(private http: HttpClient) {}
   
    getYears() {
       return this.http.get('assets/artists.json').pipe(
           map(data => {
                return Object.keys(data).reverse();
           })
       );
    }

    getArtistsForYear(year) {
        return this.http.get('assets/artists.json').pipe(
            map(data => {
                if(year === undefined) {
                   return this.getAllArtists(data);
                } 
                return this.getSortedArtists(data[year]);
            })
        );
    }

    addSelectedArtist(artist: Artist) {
        this.selectedArtists.push(artist);
    }

    getSelectedArtists() {
        return this.selectedArtists;
    }

   private getAllArtists(data) {
       let allArtists = [];
       Object.keys(data).forEach(year => {
           allArtists = allArtists.concat(data[year]);
       });

       return this.getSortedArtists(allArtists);
   }

   private getSortedArtists(artists) {
       return artists.sort((artist1, artist2) => {
           let name1 = artist1.name.toUpperCase();
           let name2 = artist2.name.toUpperCase();

           return (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0;
       })
   }
}