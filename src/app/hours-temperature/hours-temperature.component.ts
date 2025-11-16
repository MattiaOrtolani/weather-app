import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hours-temperature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hours-temperature.component.html',
  styleUrl: './hours-temperature.component.scss'
})
export class HoursTemperatureComponent implements AfterViewInit {
  @Input() hour: any;
  @Output() selectedHour = new EventEmitter<number>();

  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

  selectedHourIndex: number = new Date().getHours();

  ngAfterViewInit(): void {
    this.selectedHour.emit(this.selectedHourIndex);
    // aspetta il render del DOM prima di scrollare
    setTimeout(() => this.scrollToSelected(), 0);
  }

  onClick(i: number): void {
    this.selectedHourIndex = i;
    this.selectedHour.emit(i);
    this.scrollToSelected();
  }

  private scrollToSelected(): void {
    if (!this.carousel || !this.hour || !this.hour.length) {
      return;
    }

    const maxIndex = this.hour.length - 1;
    const index = Math.min(Math.max(this.selectedHourIndex, 0), maxIndex);

    const items = this.carousel.nativeElement.querySelectorAll('.hour');
    const el = items[index] as HTMLElement;
    if (!el) {
      return;
    }

    el.scrollIntoView({
      behavior: 'smooth',
      inline: 'center'
    });
  }
}
