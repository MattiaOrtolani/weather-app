import { Component, Input } from '@angular/core';
import { AppService } from '../app.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-week-temperature',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './week-temperature.component.html',
  styleUrl: './week-temperature.component.scss'
})
export class WeekTemperatureComponent {
  @Input() forecast: any;
}
