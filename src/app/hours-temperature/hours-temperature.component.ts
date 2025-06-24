import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'app-hours-temperature',
  imports: [CommonModule],
  templateUrl: './hours-temperature.component.html',
  styleUrl: './hours-temperature.component.scss'
})
export class HoursTemperatureComponent implements OnInit {
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
