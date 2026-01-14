import { AfterViewInit, Component, ElementRef, HostListener, input, OnChanges, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-uv',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './uv.component.html',
    styleUrl: './uv.component.scss',
})
export class UvComponent implements AfterViewInit, OnChanges {
    readonly uv = input.required<number>();
    @ViewChild('graphic', {static: true}) graphic?: ElementRef<HTMLDivElement>;
    @ViewChild('dot', {static: true}) graphicDot?: ElementRef<HTMLDivElement>;

    @HostListener('window:resize') onWindowResize(): void {
        this.uvLevel();
    }


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
