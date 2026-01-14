import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-location-permission',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './location-permission.component.html',
    styleUrl: './location-permission.component.scss',
})
export class LocationPermissionComponent {
    readonly message = input<string>('');
}
