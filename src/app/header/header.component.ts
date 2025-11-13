import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})


export class HeaderComponent 
{
  appService = new AppService();

  @Input() forecastday: any;
  @Input() city: string = '';
  @Output() search = new EventEmitter<string>();

  onSearch(cityName: string)
  {
    this.search.emit(cityName);
  }


}
