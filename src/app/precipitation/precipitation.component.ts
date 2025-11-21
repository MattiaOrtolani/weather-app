import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-precipitation',
    standalone: true,
    imports: [DatePipe],
    templateUrl: './precipitation.component.html',
    styleUrl: './precipitation.component.scss',
})
export class PrecipitationComponent {
    readonly precipitation = input.required<number>();
    readonly precipitationForecast = input.required<{date: string, precipitationForecast: number} | undefined>();
}
