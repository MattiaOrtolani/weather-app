import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-sun-hours',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './sun-hours.component.html',
    styleUrl: './sun-hours.component.scss',
})
export class SunHoursComponent {
    readonly astro = input<any>();
}
