import { Component, input, inject } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-moon-hours',
    standalone: true,
    imports: [],
    templateUrl: './moon-hours.component.html',
    styleUrl: './moon-hours.component.scss',
})
export class MoonHoursComponent {
    private readonly appService = inject(AppService);
    readonly astro = input<any>();

    readonly lang: 'it' | 'en' = this.appService.getCurrentLang();

    moonPhaseMap: Record<'it' | 'en', Record<string, string>> = {
        en: {
            'New Moon': 'New Moon',
            'Waxing Crescent': 'Waxing Crescent',
            'First Quarter': 'First Quarter',
            'Waxing Gibbous': 'Waxing Gibbous',
            'Full Moon': 'Full Moon',
            'Waning Gibbous': 'Waning Gibbous',
            'Last Quarter': 'Last Quarter',
            'Waning Crescent': 'Waning Crescent',
        },
        it: {
            'New Moon': 'Luna nuova',
            'Waxing Crescent': 'Luna crescente',
            'First Quarter': 'Primo quarto',
            'Waxing Gibbous': 'Gibbosa crescente',
            'Full Moon': 'Luna piena',
            'Waning Gibbous': 'Gibbosa calante',
            'Last Quarter': 'Ultimo quarto',
            'Waning Crescent': 'Luna calante',
        },
    };

    labels = {
        it: {
            rise: 'Leva',
            set: 'Tramonto',
            illumination: 'Illuminazione lunare',
        },
        en: {
            rise: 'Moonrise',
            set: 'Moonset',
            illumination: 'Moon illumination',
        },
    };

    getTranslatedMoonPhase(phase: string): string {
        return this.moonPhaseMap[this.lang][phase] || phase;
    }
}
