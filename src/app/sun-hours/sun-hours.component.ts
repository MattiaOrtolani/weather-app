import { Component, input, inject } from '@angular/core';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sun-hours',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sun-hours.component.html',
    styleUrl: './sun-hours.component.scss',
})
export class SunHoursComponent {
    private readonly appService = inject(AppService);

    readonly astro = input<any>();

    readonly lang: 'it' | 'en' = this.appService.getCurrentLang();

    labels = {
        it: {
            title: 'Tramonto',
            sunrise: 'levata del sole:',
        },
        en: {
            title: 'Sunset',
            sunrise: 'Sunrise:',
        },
    };
}
