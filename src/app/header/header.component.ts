import { Component, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    appService = new AppService();
    readonly forecastday = input<any>();
    readonly city = input<string>('');
}
