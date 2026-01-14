import { Component, input, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-moon-hours',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './moon-hours.component.html',
    styleUrl: './moon-hours.component.scss',
})
export class MoonHoursComponent {
    private readonly translate = inject(TranslateService);
    readonly astro = input<any>();

    getTranslatedMoonPhase(phase: string): string {
        if (!phase) {
            return '';
        }
        const key =
            'MOON_PHASE.' +
            phase
                .toUpperCase()
                .replace(/[^A-Z0-9]+/g, '_')
                .replace(/_+/g, '_');
        const translation = this.translate.instant(key);
        return translation === key ? phase : translation;
    }
}
