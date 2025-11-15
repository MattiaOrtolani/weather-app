import { Component, Input } from '@angular/core';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sun-hours',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sun-hours.component.html',
  styleUrl: './sun-hours.component.scss'
})
export class SunHoursComponent {
  @Input() astro: any;
}
