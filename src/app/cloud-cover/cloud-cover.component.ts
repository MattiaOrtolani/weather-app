import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-cloud-cover',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './cloud-cover.component.html',
    styleUrl: './cloud-cover.component.scss',
})
export class CloudCoverComponent {
    readonly cloudCover = input.required<number>();
}
