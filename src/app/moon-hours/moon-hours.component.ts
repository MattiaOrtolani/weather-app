import { Component, input } from '@angular/core';

@Component({
    selector: 'app-moon-hours',
    standalone: true,
    imports: [],
    templateUrl: './moon-hours.component.html',
    styleUrl: './moon-hours.component.scss',
})
export class MoonHoursComponent {
    readonly astro = input<any>();

    moonPhaseMap: Record<string, string> = {
        'New Moon': 'Luna nuova',
        'Waxing Crescent': 'Luna crescente',
        'First Quarter': 'Primo quarto',
        'Waxing Gibbous': 'Gibbosa crescente',
        'Full Moon': 'Luna piena',
        'Waning Gibbous': 'Gibbosa calante',
        'Last Quarter': 'Ultimo quarto',
        'Waning Crescent': 'Luna calante',
    };

    getTranslatedMoonPhase(phase: string): string {
        return this.moonPhaseMap[phase] || phase;
    }
}
