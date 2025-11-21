import { Component, ElementRef, input, ViewChild } from '@angular/core';

@Component({
    selector: 'app-pressure',
    standalone: true,
    imports: [],
    templateUrl: './pressure.component.html',
    styleUrl: './pressure.component.scss',
})
export class PressureComponent {
    readonly pressure = input.required<number>();
    readonly prevPressure = input.required<number>();
    index = Array.from({ length: 48 });
    @ViewChild('arrow') arrow!: ElementRef<HTMLDivElement>;
    readonly minPressure = 980;
    readonly maxPressure = 1050;
    readonly minAngle = -120;
    readonly maxAngle = 120;

    calcPressureAngle() {
        const p = this.pressure();
        const clamped = Math.max(this.minPressure, Math.min(this.maxPressure, p));
        const ratio =(clamped - this.minPressure) / (this.maxPressure - this.minPressure);
        const pressureAngle = this.minAngle + ratio * (this.maxAngle - this.minAngle);
        return `translate(-50%, -50%) rotate(${pressureAngle}deg)`;
    }
}
