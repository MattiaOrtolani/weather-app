import {
    Component,
    ViewChild,
    ElementRef,
    AfterViewInit,
    input,
    output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-hours-temperature',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './hours-temperature.component.html',
    styleUrl: './hours-temperature.component.scss',
})
export class HoursTemperatureComponent implements AfterViewInit {
    readonly hour = input<any>();
    readonly selectedHour = output<number>();
    readonly selectedDay = input<number>(0);

    currentHour: number = new Date().getHours();
    selectedHourIndex = this.currentHour;

    @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.selectedHour.emit(this.selectedHourIndex);
            this.scrollToSelected();
        }, 0);
    }

    onClick(i: number): void {
        this.selectedHourIndex = i;
        this.selectedHour.emit(i);
    }

    private scrollToSelected(): void {
        const hour = this.hour();
        if (!this.carousel || !hour || !hour.length) {
            return;
        }

        const maxIndex = hour.length - 1;
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
