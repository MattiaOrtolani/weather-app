import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekTemperatureComponent } from "./week-temperature/week-temperature.component";
import { HeaderComponent } from "./header/header.component";
import { HoursTemperatureComponent } from "./hours-temperature/hours-temperature.component";
import { UvComponent } from "./uv/uv.component";
import { HumidityComponent } from "./humidity/humidity.component";
import { SunHoursComponent } from "./sun-hours/sun-hours.component";
import { AppService } from './app.service';
import { WindComponent } from "./wind/wind.component";
import { MoonHoursComponent } from "./moon-hours/moon-hours.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    WeekTemperatureComponent,
    HeaderComponent,
    HoursTemperatureComponent,
    UvComponent,
    HumidityComponent,
    SunHoursComponent,
    WindComponent,
    MoonHoursComponent
  ],
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Weather App';
  weatherData: any = null;
  resolve = false;
  errorMessage = '';

  private appService = inject(AppService);

  ngOnInit(): void {
    // Ottieni coordinate dal browser
    this.appService.getCurrentPosition()
      .then(coords => {
        console.log('Coordinate utente:', coords);
        // Richiedi previsioni meteo
        this.appService.getForecast(coords.lat, coords.lon).subscribe({
          next: (data) => {
            this.weatherData = data;
            this.resolve = true;
            console.log('Dati meteo ricevuti:', this.weatherData);
          },
          error: (err) => {
            console.error('Errore nel recupero dei dati meteo:', err);
            this.errorMessage = 'Impossibile ottenere i dati meteo.';
          }
        });
      })
      .catch(err => {
        console.error('Errore geolocalizzazione:', err);
        this.errorMessage = 'Geolocalizzazione disattivata o non disponibile.';
      });
  }
}