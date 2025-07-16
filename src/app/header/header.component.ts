import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})


export class HeaderComponent 
{
  appService = new AppService();

  @Input() forecastday: any;
  city?: Observable<any> = this.appService.city$;

}
