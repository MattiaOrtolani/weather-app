import { Component, inject } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-loading-item',
  standalone: true,
  imports: [],
  templateUrl: './loading-item.component.html',
  styleUrl: './loading-item.component.scss'
})
export class LoadingItemComponent {

  private readonly appService = inject(AppService);

  readonly lang: 'it' | 'en' = this.appService.getCurrentLang();

  private readonly textByLang: Record<'it' | 'en', string> = {
    it: 'Preparo il meteo...',
    en: 'Loading weather...',
  };

  loading_text = this.textByLang[this.lang].split('');
}
