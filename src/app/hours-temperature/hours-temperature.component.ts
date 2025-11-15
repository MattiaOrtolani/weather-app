import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hours-temperature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hours-temperature.component.html',
  styleUrl: './hours-temperature.component.scss'
})
export class HoursTemperatureComponent {
  @Input() hour: any;
  @Output() selectedHour = new EventEmitter<number>();
  selectedHourIndex: number = 0; // variabile per tenere traccia dell'ora selezionata

  onClick(hour: number)
  {
    this.selectedHourIndex = hour; 
    this.selectedHour.emit(hour);
  }
}
