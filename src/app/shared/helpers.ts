import { Validators, type ValidatorFn } from '@angular/forms';

export const commentValidators: ValidatorFn[] = [
  Validators.required,
  Validators.minLength(1),
  Validators.maxLength(250),
];

export function calculateElapsedTime(from: number): string | undefined {
  const now = new Date(new Date().setSeconds(0, 0));
  const nowTime = now.getTime();

  const fromDate = new Date(new Date(from).setSeconds(0, 0));
  const fromTime = new Date(fromDate).getTime();

  const elaspedTimeInMS = nowTime - fromTime;

  return createLazyElapsedTimeCalculator()
    .find(({ filter }) => filter(fromTime, now))
    ?.calculateElapsedTime(elaspedTimeInMS);
}

function createLazyElapsedTimeCalculator(): {
  filter: (fromTime: number, nowDate: Date) => boolean;
  calculateElapsedTime: (elaspedTimeInMS: number) => string;
}[] {
  return [
    {
      filter: (fromTime: number, nowDate: Date) =>
        fromTime >=
        new Date(nowDate.getTime()).setMinutes(nowDate.getMinutes() - 5),
      calculateElapsedTime: () => 'just now',
    },
    {
      filter: (fromTime: number, nowDate: Date) =>
        fromTime > new Date(nowDate.getTime()).setHours(nowDate.getHours() - 1),
      calculateElapsedTime: (elaspedTimeInMS: number) => {
        const elapsed = Math.floor(elaspedTimeInMS / oneMinuteInMS());
        return createElapsedTimeLabel(elapsed, 'minute');
      },
    },
    {
      filter: (fromTime: number, nowDate: Date) =>
        fromTime > new Date(nowDate.getTime()).setDate(nowDate.getDate() - 1),
      calculateElapsedTime: (elaspedTimeInMS: number) => {
        const elapsed = Math.floor(elaspedTimeInMS / oneHourInMS());
        return createElapsedTimeLabel(elapsed, 'hour');
      },
    },
    {
      filter: (fromTime: number, nowDate: Date) =>
        fromTime > new Date(nowDate.getTime()).setDate(nowDate.getDate() - 7),
      calculateElapsedTime: (elaspedTimeInMS: number) => {
        const elapsed = Math.floor(elaspedTimeInMS / oneDayInMS());
        return createElapsedTimeLabel(elapsed, 'day');
      },
    },
    {
      filter: (fromTime: number, nowDate: Date) =>
        fromTime > new Date(nowDate.getTime()).setMonth(nowDate.getMonth() - 1),
      calculateElapsedTime: (elaspedTimeInMS: number) => {
        const elapsed = Math.floor(elaspedTimeInMS / oneWeekInMS());
        return createElapsedTimeLabel(elapsed, 'week');
      },
    },
    {
      filter: (fromTime: number, nowDate: Date) =>
        fromTime >
        new Date(nowDate.getTime()).setFullYear(nowDate.getFullYear() - 1),
      calculateElapsedTime: (elaspedTimeInMS: number) => {
        const elapsed = Math.ceil(elaspedTimeInMS / oneMonthInMS());
        return createElapsedTimeLabel(elapsed, 'month');
      },
    },
    {
      filter: (fromTime: number, nowDate: Date) =>
        fromTime <=
        new Date(nowDate.getTime()).setFullYear(nowDate.getFullYear() - 1),
      calculateElapsedTime: (elaspedTimeInMS: number) => {
        const elapsed = Math.ceil(elaspedTimeInMS / oneYearInMS());
        return createElapsedTimeLabel(elapsed, 'year');
      },
    },
  ];
}

function createElapsedTimeLabel(
  elapsed: number,
  unit: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute',
) {
  // TODOJ: try using Intl.RelativeTimeFormat instead
  return `${elapsed} ${unit}${elapsed > 1 ? 's' : ''} ago`;
}

function isLeapYear(year: number) {
  return new Date(year, 1, 29).getDate() === 29;
}

function oneMinuteInMS() {
  return 1_000 * 60;
}

function oneHourInMS() {
  return oneMinuteInMS() * 60;
}

function oneDayInMS() {
  return oneHourInMS() * 24;
}

function oneWeekInMS() {
  return oneDayInMS() * 7;
}

function oneMonthInMS() {
  const daysInYear = isLeapYear(new Date().getFullYear()) ? 366 : 365;
  const daysInMonths = daysInYear / 12;
  return oneDayInMS() * daysInMonths;
}

function oneYearInMS() {
  return oneMonthInMS() * 12;
}
