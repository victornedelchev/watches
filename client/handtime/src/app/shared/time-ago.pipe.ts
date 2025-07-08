import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  private now = new Date();

  transform(value: number): string {
    const then = new Date(value);
    const timePassed = this.now.getTime() - then.getTime();
    // console.log(timePassed);

    const milliseconds = 1000;
    const minute = 60 * milliseconds;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;

    if (timePassed < minute) {
      return `${(Math.floor(timePassed / milliseconds) < 2
        ? `${Math.floor(timePassed / milliseconds)} second ago`
        : `${Math.floor(timePassed / milliseconds)} seconds ago`)}`;
    }

    if (timePassed < hour) {
      return `${(Math.floor(timePassed / minute)) < 2
        ? `${Math.floor(timePassed / minute)} minute ago`
        : `${Math.floor(timePassed / minute)} minutes ago`}`;
    }

    if (timePassed < day) {
      return `${(Math.floor(timePassed / hour) < 2
        ? `${Math.floor(timePassed / hour)} hour ago`
        : `${Math.floor(timePassed / hour)} hours ago`)}`;
    }

    if (timePassed < month) {
      return `${(Math.floor(timePassed / day) < 2
        ? `${Math.floor(timePassed / day)} day ago`
        : `${Math.floor(timePassed / day)} days ago`)}`;
    }

    if (timePassed < year) {
      return `${(Math.floor(timePassed / month) < 2
        ? `${Math.floor(timePassed / month)} month ago`
        : `${Math.floor(timePassed / month)} months ago`)}`;
    }

    return `${(Math.floor(timePassed / year) < 2
      ? `${Math.floor(timePassed / year)} year ago`
      : `${Math.floor(timePassed / year)} years ago`)}`;
  }
}