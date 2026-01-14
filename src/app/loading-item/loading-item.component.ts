import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-loading-item',
    standalone: true,
    imports: [],
    templateUrl: './loading-item.component.html',
    styleUrl: './loading-item.component.scss',
})
export class LoadingItemComponent {
    private readonly translate = inject(TranslateService);

    get loadingTextChars(): string[] {
        const text = this.translate.instant('LOADING.TEXT');
        return text.split('').map((letter: string) =>
            letter === ' ' ? '\u00A0' : letter
        );
    }
}
