import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stars.component.html'
})
export class StarsComponent {

  @Input() set rating(value: number) {
    const coverPercentage = Math.floor(value / 5 * 100);
    this.coverPercentage = 100 - Math.floor(coverPercentage / 10) * 10;
  }

  public coverPercentage: number = 0;
}
