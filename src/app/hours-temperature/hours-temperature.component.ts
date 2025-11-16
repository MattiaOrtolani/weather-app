import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-hours-temperature',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hours-temperature.component.html',
    styleUrl: './hours-temperature.component.scss',
})
export class HoursTemperatureComponent implements AfterViewInit {
    @Input() hour: any;
    @Output() selectedHour = new EventEmitter<number>();
    @Input() selectedDay: number = 0;
    currentHour : number = new Date().getHours();
    selectedHourIndex = this.currentHour;

    @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

    ngAfterViewInit(): void {
        this.selectedHour.emit(this.selectedHourIndex);
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

        const container = this.carousel.nativeElement;
        const items = container.querySelectorAll('.hour');
        const el = items[index] as HTMLElement;
        if (!el) {
            return;
        }

        const target = el.offsetLeft - 15;

        container.scrollTo({
            left: target,
            behavior: 'smooth',
        });
    }
}
