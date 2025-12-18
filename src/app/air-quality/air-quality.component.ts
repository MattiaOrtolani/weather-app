import { Component, ElementRef, HostListener, input, ViewChild, inject } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-air-quality',
    standalone: true,
    imports: [],
    templateUrl: './air-quality.component.html',
    styleUrl: './air-quality.component.scss',
})
export class AirQualityComponent {
    private readonly appService = inject(AppService);

    readonly airQualityIndex = input.required<number>();
    @ViewChild('graphic', {static: true}) graphic?: ElementRef<HTMLDivElement>;
    @ViewChild('dot', {static: true}) graphicDot?: ElementRef<HTMLDivElement>;

    @HostListener('window:resize') onWindowResize(): void {
        this.airQualityLevel();
    }

    readonly lang: 'it' | 'en' = this.appService.getCurrentLang();

    labels = {
        it: {
            title: "qualità dell'aria",
            aqi1: 'Buona',
            aqi2: 'Moderata',
            aqi3: 'Critica',
            aqi4: 'Insalubre',
            aqi5: 'Molto insalubre',
            aqi6: 'Pericolosa',
        },
        en: {
            title: 'air quality',
            aqi1: 'Good',
            aqi2: 'Moderate',
            aqi3: 'Unhealthy for sensitive groups',
            aqi4: 'Unhealthy',
            aqi5: 'Very unhealthy',
            aqi6: 'Hazardous',
        },
    };

    ngAfterViewInit()
    {
        this.airQualityLevel();
    }

    ngOnChanges()
    {
        this.airQualityLevel();
    }
    
    airQualityLevel = () => {
        if (this.graphicDot === undefined || this.graphic === undefined) return;
        const maxLeft = this.graphic.nativeElement.clientWidth - this.graphicDot.nativeElement.clientWidth;
        const position = (maxLeft / 6) * this.airQualityIndex();
        this.graphicDot.nativeElement.style.left = `${(position)}px`;
    }

}
