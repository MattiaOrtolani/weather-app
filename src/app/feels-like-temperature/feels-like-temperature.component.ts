import { Component, input, inject } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-feels-like-temperature',
    imports: [],
    templateUrl: './feels-like-temperature.component.html',
    styleUrl: './feels-like-temperature.component.scss',
})
export class FeelsLikeTemperatureComponent {
    private readonly appService = inject(AppService);

    readonly feelsLikeTemperature = input<number>();
    readonly temp_c = input<number>();

    readonly lang: 'it' | 'en' = this.appService.getCurrentLang();

    labels = {
        it: {
            title: 'temp. percepita',
            real: 'Reale:',
        },
        en: {
            title: 'feels like',
            real: 'Actual:',
        },
    };
}
