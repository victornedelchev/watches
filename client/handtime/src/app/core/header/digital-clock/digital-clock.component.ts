import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.css']
})
export class DigitalClockComponent implements OnInit, OnDestroy {
  private daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  private date = new Date();

  public hour: any;
  public minute!: string;
  public second!: string;
  public meridiem!: string;
  public day!: string;
  private intervalId: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      const date = new Date();
      this.updateDate(date);
    }, 1000);

    this.day = this.daysArray[this.date.getDay()];
  }

  private updateDate(date: Date): void {
    const hours = date.getHours();
    this.meridiem = hours <= 12 ? 'AM' : 'PM';

    this.hour = hours % 12;
    this.hour = this.hour ? this.hour : 12;
    this.hour = this.padZero(this.hour);

    const minutes = date.getMinutes();
    this.minute = this.padZero(minutes);

    const seconds = date.getSeconds();
    this.second = this.padZero(seconds);
  }

  private padZero(number: number): string {
    return number < 10 ? `0${number}` : number.toString();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
