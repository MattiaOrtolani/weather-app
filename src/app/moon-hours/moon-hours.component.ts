import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-moon-hours',
  imports: [],
  templateUrl: './moon-hours.component.html',
  styleUrl: './moon-hours.component.scss'
})
export class MoonHoursComponent {
  @Input() astro: any;

  moonPhaseMap: Record<string, string> = {
    "Full Moon": "Luna piena",
    "New Moon": "Luna nuova",
    "First Quarter": "Primo quarto",
    "Last Quarter": "Ultimo quarto"
  };

  getTranslatedMoonPhase(phase: string): string {
    return this.moonPhaseMap[phase] || phase;
  }
}
