export class TimetableEvent {
  title: string;
  start: Date;
  end: Date;
  color: {primary: string, secondary: string};

  constructor(title: string, start: Date, end: Date, colorIntensity?: number) {
    this.title = title;
    this.start = start;
    this.end = end;

    colorIntensity = !colorIntensity || colorIntensity < 0.05 ? 0.05 : colorIntensity;
    this.color = {primary: 'transparent', secondary: 'rgba(63, 81, 181,' + colorIntensity + ')'};
  }
}
