import { Component, inject } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-humidity',
  imports: [],
  templateUrl: './humidity.component.html',
  styleUrl: './humidity.component.scss'
})
export class HumidityComponent {

  appService = inject(AppService);

  humidity: number = 0;

  ngOnInit()
  {
    this.appService.city$.subscribe(
      city => {
        if(city)
        {
          this.appService.getForecast().subscribe({
            next: (data) =>
            {
              this.humidity = data.forecast.forecastday[0].day.avghumidity;
              console.log('UV Index:', this.humidity);
            },
            error: (err) => {
              console.error('Errore nel recupero dei dati:', err);
            }
          })
        }
      }
    )
  }
}
