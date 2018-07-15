import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/index';

import { ArtistsService } from '../artists-picker/artists.service';
import { TimetableService } from './timetable.service';
import { TimetableEvent } from './timetable-event';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  viewDate: Date;
  nextDate: Date;
  days: string [];

  events: TimetableEvent[][] = undefined;
  recommendations: {[artistName: string]: number} = undefined;
  selectedDayId = 0;
  loaded = false;

  constructor(private artistsService: ArtistsService, private timetableService: TimetableService) { }

  ngOnInit() {
    this.days = this.timetableService.getDays();
    this.viewDate = this.timetableService.getViewDate(this.selectedDayId);
    this.nextDate = this.getNextDate(this.viewDate);
    this.recommendations = this.artistsService.getRecommendation();
    this.events = this.timetableService.getEventsList(this.selectedDayId, this.recommendations);

    this.subscription = this.artistsService.recommendationsReady.subscribe(data => {
      this.recommendations = data;
      this.events = this.timetableService.getEventsList(this.selectedDayId, this.recommendations);
    });

    this.loaded = true;
  }

  onGoToPrevious() {
    this.selectedDayId--;
    this.viewDate = this.timetableService.getViewDate(this.selectedDayId);
    this.nextDate = this.getNextDate(this.viewDate);
    this.events = this.timetableService.getEventsList(this.selectedDayId, this.recommendations);
  }

  onGoToNext() {
    this.selectedDayId++;
    this.viewDate = this.timetableService.getViewDate(this.selectedDayId);
    this.nextDate = this.getNextDate(this.viewDate);
    this.events = this.timetableService.getEventsList(this.selectedDayId, this.recommendations);
  }

  getStagesNames(): string[] {
    return this.timetableService.getStagesNames(this.selectedDayId);
  }

  getNextDate(date: Date): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);

    return newDate;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
