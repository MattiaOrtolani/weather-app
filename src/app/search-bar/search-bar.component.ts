import { Component, input, Input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search-bar',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
    isOpen = false;
    @Input() input: string = '';
    readonly search = output<string>();
    errorMessage = input<string>('');

    OnSearchClick() {
        if (!this.isOpen && this.input.length > 0) {
            this.search.emit(this.input);
            this.input = '';
        }
    }
}
