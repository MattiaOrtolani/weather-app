import { Component, inject, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-week-temperature',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './week-temperature.component.html',
  styleUrl: './week-temperature.component.scss'
})

export class WeekTemperatureComponent implements OnInit{
  appService = inject(AppService);
  response: any = undefined;

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
              this.response = data.forecast;
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
