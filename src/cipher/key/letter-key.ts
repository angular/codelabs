import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'letter-key',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="letter-box" [ngClass]="{'solved': solution!=='?'}">
        <p *ngIf="solution=='?'" class="solution">{{ letter }}={{ solution }}</p>
        <p *ngIf="solution!=='?'"class="solution">{{ solution }}</p>
    </div>
  `,
  styles: [
    `    
    .letter-box {
      aspect-ratio: 1/1;
      display: grid;
      place-items: center;

      border-radius: 50%;
      border: white solid 1px;

      cursor: default;
    }

    .answer, .key, p {
      margin: 0;
      font-size: clamp(10px, 3vw, 20px);
    }

    .solved {
      background: #202020;
      border: none;
      box-shadow: inset 3px 5px 5px -1px #ffffff80, inset -3px -3px 5px -1px #000, 1px 1px 1px 2px #000c, 2.5px 5px 5px 1px #000000e6;
    }

    .solved p {
      font-size: clamp(16px, 3vw, 20px);
    }
  `,
  ],
})
export class LetterKeyComponent {
  @Input() letter: string = '';
  @Input() solution: string = '?';
}
