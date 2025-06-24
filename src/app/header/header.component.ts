import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})


export class HeaderComponent 
{

  appService = new AppService();
  response: any = undefined;
  city: string = '';

  ngOnInit()
  {
    this.appService.city$.subscribe(
      city => {
        if(city)
        {
          this.city = city;
          this.appService.getForecast().subscribe({
            next: (data) =>
            {
              this.response = data.forecast;
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
