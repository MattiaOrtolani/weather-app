import { Component, input, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppService } from '../app.service';

@Component({
    selector: 'app-precipitation',
    standalone: true,
    imports: [DatePipe],
    templateUrl: './precipitation.component.html',
    styleUrl: './precipitation.component.scss',
})
export class PrecipitationComponent {
    private readonly appService = inject(AppService);

    readonly precipitation = input.required<number>();
    readonly precipitationForecast = input.required<{date: string, precipitationForecast: number} | undefined>();

    readonly lang: 'it' | 'en' = this.appService.getCurrentLang();

    labels = {
        it: {
            title: 'precipitazioni',
            forecastPrefix: 'Previsti:',
            noForecast: 'Nessuna previsione disponibile',
        },
        en: {
            title: 'precipitation',
            forecastPrefix: 'Expected:',
            noForecast: 'No forecast available',
        },
    };
}
