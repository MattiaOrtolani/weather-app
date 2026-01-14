import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-snow',
    standalone: true,
    imports: [DatePipe, TranslateModule],
    templateUrl: './snow.component.html',
    styleUrl: './snow.component.scss',
})
export class SnowComponent {
    readonly snow = input.required<number>();
    readonly snowForecast = input.required<{
        date: string;
        snowForecast: number;
    } | undefined>();
}
