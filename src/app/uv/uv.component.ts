import { Component, Input } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-uv',
  imports: [],
  templateUrl: './uv.component.html',
  styleUrl: './uv.component.scss'
})
export class UvComponent {
  @Input() uv!: number;
}
