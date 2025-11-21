import { Component, input } from '@angular/core';

@Component({
    selector: 'app-feels-like-temperature',
    imports: [],
    templateUrl: './feels-like-temperature.component.html',
    styleUrl: './feels-like-temperature.component.scss',
})
export class FeelsLikeTemperatureComponent {
    readonly feelsLikeTemperature = input<number>();
    readonly temp_c = input<number>();
}
