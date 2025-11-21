import { Component, input } from '@angular/core';

@Component({
    selector: 'app-cloud-cover',
    standalone: true,
    imports: [],
    templateUrl: './cloud-cover.component.html',
    styleUrl: './cloud-cover.component.scss',
})
export class CloudCoverComponent {
    readonly cloudCover = input.required<number>();
}

