import { Component, OnChanges, SimpleChanges, input, output, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'app-week-temperature',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './week-temperature.component.html',
  styleUrl: './week-temperature.component.scss'
})

export class WeekTemperatureComponent implements OnChanges 
{
  private readonly appService = inject(AppService);

  readonly forecast = input<any>();
  readonly selectDayEvent = output<any>();
  selectedDayIndex: number = 0;

  readonly lang: 'it' | 'en' = this.appService.getCurrentLang();

  labels = {
    it: {
      title: 'Previsione per 3 giorni'
    },
    en: {
      title: '3-day forecast'
    }
  };

  alignment: 'flex-start' | 'center' | 'flex-end' = 'flex-start';
  computedStyles: Array<{ start: string; len: string; c1: string; c2: string }> = [];

  private minT!: number; // scala dinamica
  private maxT!: number; // scala dinamica
  private span!: number; // maxT - minT

  ngOnChanges(_: SimpleChanges): void 
  {
    const forecast = this.forecast();
    if (!forecast || !forecast.forecastday) 
    {
      return;
    }

    const days = forecast.forecastday as Array<any>;
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

    // quando cambia l'input, ricalcola i valori per il binding degli stili
    this.recomputeStyles();
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

  private recomputeStyles(): void
  {
    const forecast = this.forecast();
    if (!forecast || !forecast.forecastday || this.span == null)
    {
      this.computedStyles = [];
      return;
    }

    const days = forecast.forecastday as Array<any>;
    this.computedStyles = days.map(d => {
      if (!d?.day)
      {
        return { start: '0%', len: '0%', c1: 'transparent', c2: 'transparent' };
      }

      const minRaw: number = Number(d.day.mintemp_c);
      const maxRaw: number = Number(d.day.maxtemp_c);

      const min = this.clamp(minRaw, this.minT, this.maxT);
      const max = this.clamp(maxRaw, this.minT, this.maxT);

      const startPct = this.toPct(Math.min(min, max));
      const endPct   = this.toPct(Math.max(min, max));
      const lenPct   = Math.max(0, endPct - startPct);

      const c1 = `hsl(${this.tempToHue(min)}, 95%, 50%)`;
      const c2 = `hsl(${this.tempToHue(max)}, 90%, 45%)`;

      return {
        start: startPct.toFixed(2) + '%',
        len: lenPct.toFixed(2) + '%',
        c1,
        c2
      };
    });
  }

  selectDay(index: any)
  {
    this.selectDayEvent.emit(index);
    this.selectedDayIndex = index;
  }
}
