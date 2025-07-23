import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-moon-hours',
  imports: [],
  templateUrl: './moon-hours.component.html',
  styleUrl: './moon-hours.component.scss'
})
export class MoonHoursComponent {
  @Input() astro: any;
}
