import { Component, input, inject } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-humidity',
    standalone: true,
    imports: [],
    templateUrl: './humidity.component.html',
    styleUrl: './humidity.component.scss',
})
export class HumidityComponent {
    private readonly appService = inject(AppService);

    readonly humidity = input.required<number>();
    readonly dew_point = input.required<number>();

    readonly lang: 'it' | 'en' = this.appService.getCurrentLang();

    labels = {
        it: {
            title: 'umidità',
            dewPoint: 'Punto di rugiada:',
        },
        en: {
            title: 'humidity',
            dewPoint: 'Dew point:',
        },
    };
}
