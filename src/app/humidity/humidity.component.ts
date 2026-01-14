import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-humidity',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './humidity.component.html',
    styleUrl: './humidity.component.scss',
})
export class HumidityComponent {
    readonly humidity = input.required<number>();
    readonly dew_point = input.required<number>();
}
