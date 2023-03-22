import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'letter-guess',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="guess-box">
      <p>{{ letter }}</p>
    </div>
  `,
  styles: [
    `
    :host {
      cursor: grab;
    }
    
    .guess-box {
      aspect-ratio: 1/1;

      display: grid;
      place-items: center;

      border-radius: 50%;

      background: #202020;
    }

    p {
      font-size: clamp(16px, 3vw, 20px);
      margin: 0;

      color: white;
      text-shadow: 1px 2px 1px rgb(255 255 255 / 50%);
  `,
  ],
})
export class LetterGuessComponent {
  @Input() letter: string = '';
}
