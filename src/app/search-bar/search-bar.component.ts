import { Component, inject, input, Input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { AppService } from '../app.service';

@Component({
    selector: 'app-search-bar',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
    input: string = '';
    suggestionResult: any[] = [];
    readonly search = output<string>();
    errorMessage = input<string>('');
    private query$ = new Subject<string>();
    private appService = inject(AppService);

    readonly lang: 'it' | 'en' = this.appService.getCurrentLang();

    labels = {
        it: {
            placeholder: 'Cerca...',
        },
        en: {
            placeholder: 'Search...',
        },
    };
    
    constructor() {
        this.query$
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                switchMap((q) => this.appService.getSuggestions(q))
            )
            .subscribe((results: any[]) => {
                console.log(results);
                this.suggestionResult = results;
            });
    }

    OnSuggestionClick(cityName: string) {
        this.search.emit(cityName.trim());
        this.query$.next('');
        this.input = '';
    }

    OnQueryChange(value: string) 
    {
        this.input = value;
        this.query$.next(this.input);
    }
}
