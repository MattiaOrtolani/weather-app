import { Component, input, inject } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-location-permission',
    standalone: true,
    imports: [],
    templateUrl: './location-permission.component.html',
    styleUrl: './location-permission.component.scss',
})
export class LocationPermissionComponent {
    private readonly appService = inject(AppService);

    readonly message = input<string>('');

    readonly lang: 'it' | 'en' = this.appService.getCurrentLang();

    labels = {
        it: {
            title: 'Impossibile rilevare la posizione',
            defaultMessage: 'Geolocalizzazione disattivata o non disponibile.',
            hint: 'Attiva la geolocalizzazione nelle impostazioni del browser e aggiorna la pagina per visualizzare il meteo della tua zona.',
        },
        en: {
            title: 'Unable to detect location',
            defaultMessage: 'Location disabled or not available.',
            hint: 'Enable location in your browser settings and reload the page to see the weather for your area.',
        },
    };
}
