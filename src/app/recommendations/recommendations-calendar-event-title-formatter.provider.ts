import { LOCALE_ID, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';

export class RecommendationsCalendarEventTitleFormatter extends CalendarEventTitleFormatter {
    constructor(@Inject(LOCALE_ID) private locale: string) {
        super();
    }

    day(event: CalendarEvent): string {
        return `${new DatePipe(this.locale).transform(event.start, 'HH:mm', this.locale)}
                - ${new DatePipe(this.locale).transform(event.end, 'HH:mm', this.locale)} ${event.title}`;
    }
}