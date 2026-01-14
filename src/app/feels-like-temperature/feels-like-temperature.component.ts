import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-feels-like-temperature',
    imports: [TranslateModule],
    templateUrl: './feels-like-temperature.component.html',
    styleUrl: './feels-like-temperature.component.scss',
})
export class FeelsLikeTemperatureComponent {
    readonly feelsLikeTemperature = input<number>();
    readonly temp_c = input<number>();
}
