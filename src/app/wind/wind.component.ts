import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wind',
  standalone: true,
  imports: [],
  templateUrl: './wind.component.html',
  styleUrl: './wind.component.scss'
})
export class WindComponent {
  @Input() wind_speed!: number;
  @Input() wind_direction!: string;
  @Input() wind_degree!: number;
}
