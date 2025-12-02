import { Component, input } from '@angular/core';

@Component({
    selector: 'app-location-permission',
    standalone: true,
    imports: [],
    templateUrl: './location-permission.component.html',
    styleUrl: './location-permission.component.scss',
})
export class LocationPermissionComponent {
    readonly message = input<string>('');
}

