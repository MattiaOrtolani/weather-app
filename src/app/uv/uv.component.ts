import { AfterViewInit, Component, ElementRef, HostListener, input, OnChanges, ViewChild, inject } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-uv',
    standalone: true,
    imports: [],
    templateUrl: './uv.component.html',
    styleUrl: './uv.component.scss',
})
export class UvComponent implements AfterViewInit, OnChanges{
    private readonly appService = inject(AppService);

    readonly uv = input.required<number>();
    @ViewChild('graphic', {static: true}) graphic?: ElementRef<HTMLDivElement>;
    @ViewChild('dot', {static: true}) graphicDot?: ElementRef<HTMLDivElement>;

    @HostListener('window:resize') onWindowResize(): void {
        this.uvLevel();
    }

    readonly lang: 'it' | 'en' = this.appService.getCurrentLang();

    labels = {
        it: {
            title: 'Indice UV',
            low: 'Basso',
            moderate: 'Moderato',
            high: 'Alto',
            veryHigh: 'Molto Alto',
            extreme: 'Estremo',
        },
        en: {
            title: 'UV Index',
            low: 'Low',
            moderate: 'Moderate',
            high: 'High',
            veryHigh: 'Very High',
            extreme: 'Extreme',
        },
    };


    ngAfterViewInit()
    {
        this.uvLevel();
    }

    ngOnChanges()
    {
        this.uvLevel();
    }
    
    uvLevel = () => {
        if (this.graphicDot === undefined || this.graphic === undefined) return;
        const maxLeft = this.graphic.nativeElement.clientWidth - this.graphicDot.nativeElement.clientWidth;
        const position = (maxLeft / 11) * this.uv();
        this.graphicDot.nativeElement.style.left = `${(position)}px`;
    }
}
