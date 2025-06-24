import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekTemperatureComponent } from "./week-temperature/week-temperature.component";
import { HeaderComponent } from "./header/header.component";
import { HoursTemperatureComponent } from "./hours-temperature/hours-temperature.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, WeekTemperatureComponent, HeaderComponent, HoursTemperatureComponent],
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})


export class AppComponent
{
  title = 'Weather App';
}