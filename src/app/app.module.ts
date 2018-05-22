import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ArtistsPickerComponent } from './artists-picker/artists-picker.component';
import { ArtistsGridComponent } from './artists-picker/artists-grid/artists-grid.component';
import { ArtistElementComponent } from './artists-picker/artists-grid/artist-element/artist-element.component';
import { ArtistsService } from './artists-picker/artists.service';
import { FilterPipe } from './shared/filter.pipe';
import { RecommendationsComponent } from './recommendations/recommendations.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artists', component: ArtistsPickerComponent },
  { path: 'recommendations', component: RecommendationsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtistsPickerComponent,
    ArtistsGridComponent,
    FilterPipe,
    ArtistElementComponent,
    RecommendationsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ArtistsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
