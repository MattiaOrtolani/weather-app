import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  isOpen = false;
  @Input() input: string = '';
  @Output() search = new EventEmitter<string>();

  OnSearchClick()
  {
    if(!this.isOpen && this.input.length > 0)
    {
      this.search.emit(this.input);
      this.input = '';
    }
  }
}
