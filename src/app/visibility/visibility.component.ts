import { Component, input } from '@angular/core';

@Component({
    selector: 'app-visibility',
    imports: [],
    templateUrl: './visibility.component.html',
    styleUrl: './visibility.component.scss',
})
export class VisibilityComponent {
    readonly visibility =  input.required<number>();
}
