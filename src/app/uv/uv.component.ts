import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-uv',
  standalone: true,
  imports: [],
  templateUrl: './uv.component.html',
  styleUrl: './uv.component.scss'
})
export class UvComponent {
  @Input() uv!: number;
}
