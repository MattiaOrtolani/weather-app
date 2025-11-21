import { Component, input } from '@angular/core';

@Component({
    selector: 'app-humidity',
    standalone: true,
    imports: [],
    templateUrl: './humidity.component.html',
    styleUrl: './humidity.component.scss',
})
export class HumidityComponent {
    readonly humidity = input.required<number>();
    readonly dew_point = input.required<number>();
}
