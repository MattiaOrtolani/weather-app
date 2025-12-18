import { Component, output, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    private readonly appService = inject(AppService);

    readonly forecastday = input<any>();
    readonly city = input<string>('');

    readonly lang: 'it' | 'en' = this.appService.getCurrentLang();

    labels = {
        it: {
            max: 'max:',
            min: 'min:',
        },
        en: {
            max: 'max:',
            min: 'min:',
        },
    };
}
