import { Component, input } from '@angular/core';

@Component({
    selector: 'app-wind',
    standalone: true,
    imports: [],
    templateUrl: './wind.component.html',
    styleUrl: './wind.component.scss',
})
export class WindComponent {
    readonly wind_speed = input.required<number>();
    readonly wind_direction = input.required<string>();
    readonly wind_degree = input.required<number>();
    readonly wind_chill = input.required<number>();
    index = Array.from({ length: 72 });

    get windDirectionStyle(): string {
        return `translateX(-50%) rotate(${this.wind_degree()}deg)`;
    }
}
