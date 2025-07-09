import { Component, inject, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sun-hours',
  imports: [CommonModule],
  templateUrl: './sun-hours.component.html',
  styleUrl: './sun-hours.component.scss'
})
export class SunHoursComponent implements OnInit
{
  appService = inject(AppService);
  response: any;;

  ngOnInit()
  {
    this.appService.city$.subscribe(
      city => {
        console.log(city)
        if(city)
        {
          this.appService.getForecast().subscribe({
            next: (data) =>
            {
              this.response = data.forecast.forecastday[0].astro;
              console.log(this.response);
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
