import { Component, Input, AfterViewInit, ViewChildren, ElementRef, QueryList, OnChanges, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-week-temperature',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './week-temperature.component.html',
  styleUrl: './week-temperature.component.scss'
})

export class WeekTemperatureComponent implements AfterViewInit, OnChanges 
{
  @Input() forecast: any;

  // raccoglie tutte le barre visive
  @ViewChildren('graphicLine') graphicLines!: QueryList<ElementRef<HTMLElement>>;

  private minT!: number; // scala dinamica
  private maxT!: number; // scala dinamica
  private span!: number; // maxT - minT

  ngAfterViewInit(): void 
  {
    this.updateBars();
  }

  ngOnChanges(_: SimpleChanges): void 
  {
    if (!this.forecast || !this.forecast.forecastday) 
    {
      return;
    }

    const days = this.forecast.forecastday as Array<any>;
    const mins = days.map(d => Number(d?.day?.mintemp_c)).filter(v => !Number.isNaN(v));
    const maxs = days.map(d => Number(d?.day?.maxtemp_c)).filter(v => !Number.isNaN(v));

    if (mins.length && maxs.length) 
    {
      const minVal = Math.min(...mins);
      const maxVal = Math.max(...maxs);
      this.minT = minVal - 2;   // minimo - 2
      this.maxT = maxVal + 2;   // massimo + 2
      this.span = Math.max(1, this.maxT - this.minT); // evita 0
    }

    // quando cambia l'input, aggiorna le barre (se la view non è pronta, avverrà anche in ngAfterViewInit)
    this.updateBars();
  }

  private clamp(v: number, a: number, b: number): number 
  {
    return Math.max(a, Math.min(b, v));
  }

  private toPct(temp: number): number 
  {
    // mappa temp -> 0..100%
    return ((temp - this.minT) / this.span) * 100;
  }

  private tempToHue(temp: number): number 
  {
    const p = (temp - this.minT) / this.span; // 0..1
    const pivot = 0.7; // transizione più tardiva verso il caldo
    if (p <= pivot) {
      // blu (220°) → giallo (60°) entro il 70% della scala
      const subP = p / pivot;
      return 220 + (60 - 220) * subP;
    } else {
      // giallo (60°) → arancio/rosso tenue (15°) nell'ultimo 30%
      const subP = (p - pivot) / (1 - pivot);
      return 60 + (15 - 60) * subP;
    }
  }

  private updateBars(): void 
  {

    if (!this.forecast || !this.forecast.forecastday || !this.graphicLines || this.graphicLines.length === 0 || this.span == null) 
    {
      return;
    }

    const days = this.forecast.forecastday as Array<any>;

    for (let i = 0; i < this.graphicLines.length && i < days.length; i++) 
    {
      const d = days[i];
      const el = this.graphicLines.get(i)?.nativeElement;
      if (!el || !d?.day) continue;

      const minRaw: number = Number(d.day.mintemp_c);
      const maxRaw: number = Number(d.day.maxtemp_c);

      const min = this.clamp(minRaw, this.minT, this.maxT);
      const max = this.clamp(maxRaw, this.minT, this.maxT);

      const startPct = this.toPct(Math.min(min, max));
      const endPct   = this.toPct(Math.max(min, max));
      const lenPct   = Math.max(0, endPct - startPct);

      const c1 = `hsl(${this.tempToHue(min)}, 95%, 50%)`;
      const c2 = `hsl(${this.tempToHue(max)}, 90%, 45%)`;

      el.style.setProperty('--start', startPct.toFixed(2) + '%');
      el.style.setProperty('--len',   lenPct.toFixed(2) + '%');
      el.style.setProperty('--c1', c1);
      el.style.setProperty('--c2', c2);
    }
  }
}