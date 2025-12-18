import { Component, input, inject } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-visibility',
    imports: [],
    templateUrl: './visibility.component.html',
    styleUrl: './visibility.component.scss',
})
export class VisibilityComponent {
    private readonly appService = inject(AppService);

    readonly visibility =  input.required<number>();

    readonly lang: 'it' | 'en' = this.appService.getCurrentLang();

    labels = {
        it: {
            title: 'visibilità',
            veryGood: 'Ottima visibilità',
            good: 'Buona visibilità',
            moderate: 'Visibilità moderata',
            poor: 'Visibilità scarsa',
            veryPoor: 'Visibilità molto scarsa',
        },
        en: {
            title: 'visibility',
            veryGood: 'Excellent visibility',
            good: 'Good visibility',
            moderate: 'Moderate visibility',
            poor: 'Poor visibility',
            veryPoor: 'Very poor visibility',
        },
    };
}
