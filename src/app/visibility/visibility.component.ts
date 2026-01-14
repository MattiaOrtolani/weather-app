import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-visibility',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './visibility.component.html',
    styleUrl: './visibility.component.scss',
})
export class VisibilityComponent {
    readonly visibility = input.required<number>();
}
