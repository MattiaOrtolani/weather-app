import { Component, input, inject } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-cloud-cover',
    standalone: true,
    imports: [],
    templateUrl: './cloud-cover.component.html',
    styleUrl: './cloud-cover.component.scss',
})
export class CloudCoverComponent {
    private readonly appService = inject(AppService);

    readonly cloudCover = input.required<number>();

    readonly lang: 'it' | 'en' = this.appService.getCurrentLang();

    labels = {
        it: {
            title: 'nuvole',
        },
        en: {
            title: 'clouds',
        },
    };
}
