import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TimetableEvent } from './timetable-event';

@Injectable()
export class TimetableService {
  private days: string[];
  private timetable: {};

  constructor(private http: HttpClient) { }

  initTimetable() {
    const httpOptions = {headers: new HttpHeaders({'Content-Type':  'application/json'})};

    return new Promise((resolve, reject) => {
      this.http.get('https://boffin-api.herokuapp.com/api/timetable', httpOptions).subscribe(data => {
        this.timetable = data;
        this.days = Object.keys(data);
        resolve(true);
      });
    });
  }

  getDays(): string[] {
    return this.days;
  }

  getStagesNames(dayId: number): string[] {
    return Object.keys(this.timetable[this.days[dayId]].stages);
  }

  getViewDate(dayId): Date {
    return new Date(this.timetable[this.days[dayId]].date);
  }

  getEventsList(dayId: number, recommendations?): TimetableEvent[][]{
    const events = [];
    const stages: {} = this.timetable[this.days[dayId]].stages;

    Object.keys(stages).forEach(stageName => {
      events.push(stages[stageName].map(event => {
        return new TimetableEvent(
          event.title,
          new Date(event.start),
          new Date(event.end),
          recommendations ? Math.round(recommendations[event.name] * 10) / 10 : null
        );
      }));
    });

    return events;
  }
}
