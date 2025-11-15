import { Component, Input } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-humidity',
  standalone: true,
  imports: [],
  templateUrl: './humidity.component.html',
  styleUrl: './humidity.component.scss'
})
export class HumidityComponent {
  @Input() humidity!: number;
}
