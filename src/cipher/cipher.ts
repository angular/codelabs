import { Component, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import * as confetti from 'canvas-confetti';

import { LetterKeyComponent } from './key/letter-key';
import { LetterGuessComponent } from './guess/letter-guess';
import { CipherKey, CipherService } from './service.cipher';
import { MessageService } from '../secret-message/service.message';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'cipher',
  standalone: true,
  imports: [
    CommonModule,
    LetterKeyComponent,
    LetterGuessComponent,
    DragDropModule,
    MatTooltipModule,
  ],
  template: `
  <div class="cipher-wrapper" cdkDropListGroup>
    <div class="key-container"
          matTooltip="Drap and drop black letters to the white keypad to decode the secret message."
          [matTooltipPosition]="'above'">
      <letter-key 
        *ngFor="let l of this.cipher.alphabet" 
        [letter]="l"
        [solution]="getCipherSolution(l)"
        cdkDropList 
        cdkDropListSortingDisabled
        [cdkDropListData]="l"/>
    </div>
    <div class="guess-container"
      cdkDropList
      cdkDropListSortingDisabled>
      <letter-guess
        *ngFor="let l of this.cipher.unsolvedAlphabet()" 
        [letter]="l" 
        cdkDrag
        [cdkDragData]="l"
        (cdkDragDropped)="drop($event)">
        <div class="placeholder" *cdkDragPlaceholder></div>
      </letter-guess>
    </div>
  </div>
  `,
  styles: [
    `
    .cipher-wrapper {
      z-index: 100;
      height: 47%;
      aspect-ratio: 10/9;
      margin: auto;
      transform: translateY(15%);
    }

    .key-container, .guess-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(8%, 1fr));
      grid-gap: clamp(5px, 2.75vw, 1em);
    }

    .guess-container {
      margin-top: 1rem;
    }

    .placeholder { display: none }
  `,
  ],
})
export class CipherComponent implements OnInit {
  constructor(private messages: MessageService, public cipher: CipherService) {}

  // Preseed the cypher with any solved values plus "a" and "n"
  ngOnInit(): void {
    for (let item of this.cipher.cipher()) {
      if (this.cipher.checkForMatch(item.key, item.value)) {
        this.addSolution(item.value, item.key);
      } else if (item.key === 'a') {
        this.cipher.checkForMatch(item.value, item.key);
        this.addSolution(item.value, item.key);
      } else if (item.key === 'n') {
        this.cipher.checkForMatch(item.value, item.key);
        this.addSolution(item.value, item.key);
      }
    }

    // TODO(3): Add your first effect()
  }

  drop(event: CdkDragDrop<string, string>) {
    let key = event.container.data;
    let value = event.item.data;

    if (this.cipher.checkForMatch(key, value)) {
      this.addSolution(key, value);
    }
  }

  addSolution(key: string, value: string) {
    let solution: CipherKey = { key: key, value: value };

    this.cipher.decodedCipher.set([...this.cipher.decodedCipher(), solution]);
  }

  getCipherSolution(char: string): string | null {
    for (var key of this.cipher.decodedCipher()) {
      if (key.key === char) return key.value;
    }
    return '?';
  }
}
