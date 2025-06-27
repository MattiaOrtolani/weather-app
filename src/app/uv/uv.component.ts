import { Component, inject, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-uv',
  imports: [],
  templateUrl: './uv.component.html',
  styleUrl: './uv.component.scss'
})

export class UvComponent implements OnInit
{
  appService = inject(AppService);


  uv: number = 0;

  ngOnInit()
  {
    this.appService.city$.subscribe(
      city => {
        if(city)
        {
          this.appService.getForecast().subscribe({
            next: (data) =>
            {
              this.uv = data.forecast.forecastday[0].day.uv;
              console.log('UV Index:', this.uv);
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
