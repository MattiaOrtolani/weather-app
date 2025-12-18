import { Component, input, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppService } from '../app.service';

@Component({
    selector: 'app-snow',
    standalone: true,
    imports: [DatePipe],
    templateUrl: './snow.component.html',
    styleUrl: './snow.component.scss',
})
export class SnowComponent {
    private readonly appService = inject(AppService);

    readonly snow = input.required<number>();
    readonly snowForecast = input.required<{
        date: string;
        snowForecast: number;
    } | undefined>();

    readonly lang: 'it' | 'en' = this.appService.getCurrentLang();

    labels = {
        it: {
            title: 'neve',
            forecastPrefix: 'Previsti:',
            noForecast: 'Nessuna previsione di neve',
        },
        en: {
            title: 'snow',
            forecastPrefix: 'Expected:',
            noForecast: 'No snow expected',
        },
    };
}
