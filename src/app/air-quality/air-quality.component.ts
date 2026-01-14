import { Component, ElementRef, HostListener, input, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-air-quality',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './air-quality.component.html',
    styleUrl: './air-quality.component.scss',
})
export class AirQualityComponent {
    readonly airQualityIndex = input.required<number>();
    @ViewChild('graphic', {static: true}) graphic?: ElementRef<HTMLDivElement>;
    @ViewChild('dot', {static: true}) graphicDot?: ElementRef<HTMLDivElement>;

    @HostListener('window:resize') onWindowResize(): void {
        this.airQualityLevel();
    }

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
