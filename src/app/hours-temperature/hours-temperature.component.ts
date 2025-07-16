import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'app-hours-temperature',
  imports: [CommonModule],
  templateUrl: './hours-temperature.component.html',
  styleUrl: './hours-temperature.component.scss'
})
export class HoursTemperatureComponent {
  @Input() forecastday: any;
}
