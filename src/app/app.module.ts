import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

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
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ArtistsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
