import { Component, input, output } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";

@Component({
    selector: 'app-menu',
    imports: [SearchBarComponent],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
})
export class MenuComponent{
    isOpen: boolean = false;
    readonly search = output<string>();
    errorMessage = input<string>('');

    toggleMenu() {
        this.isOpen = !this.isOpen;
    }

    onSearch(cityName: string) {
        this.search.emit(cityName);
        this.toggleMenu();
    }
}
