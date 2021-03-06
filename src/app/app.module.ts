import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CalendarModule } from 'angular-calendar';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ArtistsPickerComponent } from './artists-picker/artists-picker.component';
import { ArtistsGridComponent } from './artists-picker/artists-grid/artists-grid.component';
import { ArtistElementComponent } from './artists-picker/artists-grid/artist-element/artist-element.component';
import { ArtistsService } from './artists-picker/artists.service';
import { FilterPipe } from './shared/filter.pipe';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { TimetableService } from './recommendations/timetable.service';
import { LocalStorageService } from './shared/local-storage.service';
import { LegendDialogComponent } from './shared/legend-dialog/legend-dialog.component'
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component'
import { ConfirmSnackBarComponent } from './shared/confirm-snack-bar/confirm-snack-bar.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artists', component: ArtistsPickerComponent },
  { path: 'recommendations', component: RecommendationsComponent }
];

export function timetableServiceFactory(provider: TimetableService) {
  return () => provider.initTimetable();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtistsPickerComponent,
    ArtistsGridComponent,
    FilterPipe,
    ArtistElementComponent,
    RecommendationsComponent,
    LegendDialogComponent,
    ConfirmSnackBarComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    CalendarModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ArtistsService,
    TimetableService,
    LocalStorageService,
    { provide: APP_INITIALIZER, useFactory: timetableServiceFactory, deps: [TimetableService, HttpClientModule], multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent, ConfirmSnackBarComponent, LegendDialogComponent]
})

export class AppModule { }
