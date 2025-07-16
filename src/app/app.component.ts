import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekTemperatureComponent } from "./week-temperature/week-temperature.component";
import { HeaderComponent } from "./header/header.component";
import { HoursTemperatureComponent } from "./hours-temperature/hours-temperature.component";
import { UvComponent } from "./uv/uv.component";
import { HumidityComponent } from "./humidity/humidity.component";
import { SunHoursComponent } from "./sun-hours/sun-hours.component";
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, WeekTemperatureComponent, HeaderComponent, HoursTemperatureComponent, UvComponent, HumidityComponent, SunHoursComponent],
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})


export class AppComponent implements OnInit {
  title = 'Weather App';
  weatherData: any = undefined;
  appService = new AppService();
  resolve: boolean = false;

  ngOnInit() {
    this.appService.getForecast().subscribe({
      next: (data) => {
        this.weatherData = data;
        this.resolve = true;
      },
      error: (err) => {
        console.error('Errore nel recupero dei dati:', err);
      }
    });
  }
}