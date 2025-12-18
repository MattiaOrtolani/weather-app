import { Component, input, inject } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-wind',
    standalone: true,
    imports: [],
    templateUrl: './wind.component.html',
    styleUrl: './wind.component.scss',
})
export class WindComponent {
    private readonly appService = inject(AppService);

    readonly wind_speed = input.required<number>();
    readonly wind_direction = input.required<string>();
    readonly wind_degree = input.required<number>();
    readonly wind_chill = input.required<number>();
    index = Array.from({ length: 72 });

    readonly lang: 'it' | 'en' = this.appService.getCurrentLang();

    labels = {
        it: {
            title: 'vento',
            wind: 'Vento:',
            direction: 'Direzione:',
            feelsLike: 'Percepita:',
        },
        en: {
            title: 'wind',
            wind: 'Wind:',
            direction: 'Direction:',
            feelsLike: 'Feels like:',
        },
    };

    get windDirectionStyle(): string {
        return `translateX(-50%) rotate(${this.wind_degree()}deg)`;
    }
}
